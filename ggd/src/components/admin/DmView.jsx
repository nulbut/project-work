import moment from "moment";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AdminPageContextStore } from "./AdminPageStatus";
import axios from "axios";
import DmList from "./DmList";
import Button from "../idealcup/Button";

const df = (date) => moment(date).format("YYYY-MM-DD");

const DmView = ({ dnum }) => {
  const pageSt = useContext(AdminPageContextStore);

  const [directmsg, setDirectmsg] = useState({});

  //const { dtitle, dcomment } = data;

  useEffect(() => {
    axios
      .get("/admin/getDm", { params: { DNum: dnum } })
      .then((res) => {
        console.log(res.data);
        setDirectmsg(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //const formData = new FormData();

  const onCh = useCallback(
    (e) => {
      const dataObj = {
        ...directmsg,
        [e.target.name]: e.target.value,
      };
      setDirectmsg(dataObj);
    },
    [directmsg]
  );

  const viewChange = () => {
    console.log("DmView viewchange");
    pageSt.setViewPage(<DmList />);
  };

  const updateDm = (e) => {
    e.preventDefault();
    axios
      .post("", directmsg)
      .then((res) => {
        console.log(res.data);
        if (res.data == "ok") {
          alert("답변 완료");
          viewChange();
        } else {
          alert("작성 실패");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("전송 실패");
      });
  };

  return (
    <div className="Main">
      <div className="Content">
        <h1>1 : 1 문의</h1>
        <form className="Box" onSubmit={updateDm}>
          <div className="DataArea">
            <div className="Input">
              <input
                type="text"
                value={directmsg.dtitle}
                readOnly
                className="inputField"
              />
            </div>
            <div className="Text">
              <input
                type="text"
                value={df(directmsg.rdate)}
                readOnly
                className="inputField"
              />
            </div>
            <div className="ID">
              <input
                type="text"
                value={directmsg.duid}
                readOnly
                className="inputField"
              />
            </div>
            <div className="Text">
              <textarea readOnly className="inputField">
                {directmsg.dcontent}
              </textarea>
            </div>

            <textarea className="Textarea" name="dcomment" onChange={onCh}>
              {directmsg.dcomment}
            </textarea>
          </div>
          <div className="Buttons">
            <Button wsize="s-10" onClick={viewChange}>
              뒤로가기
            </Button>
            <Button type="submit" size="small" wsize="s-20">
              답변 등록
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DmView;
