import moment from "moment";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AdminPageContextStore } from "./AdminPageStatus";
import axios from "axios";
import DmList from "./DmList";
import Button from "../idealcup/Button";
// import "./scss/DmView.scss";
import "./scss/Admin.scss";

const df = (date) => moment(date).format("YYYY-MM-DD");

const DmView = ({ dnum }) => {
  const pageSt = useContext(AdminPageContextStore);

  const [directmsg, setDirectmsg] = useState({});
  const [drcomment, setDrcomment] = useState("");

  //const { dtitle, dcomment } = data;

  useEffect(() => {
    axios
      .get("/admin/getDm", { params: { dnum: dnum } })
      .then((res) => {
        console.log(res.data);
        setDirectmsg(res.data);
        setDrcomment(res.data.dcomment);
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
      setDrcomment(e.target.value);
    },
    [directmsg, drcomment]
  );

  const viewChange = () => {
    console.log("DmView viewchange");
    pageSt.setViewPage(<DmList />);
  };

  const updateDm = (e) => {
    e.preventDefault();
    console.log(directmsg);
    axios
      .post("/admin/dComment", directmsg)
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
    <form className="Content" onSubmit={updateDm}>
      <h1>1 : 1 문의</h1>
      <div className="DmInput">
        <input
          className="Input"
          type="text"
          value={directmsg.dtitle}
          readOnly
        />
        <input
          type="text"
          value={df(directmsg.rDate)}
          readOnly
          className="Input"
        />
        <input className="Input" type="text" value={directmsg.duid} readOnly />
      </div>
      <textarea
        readOnly
        className="Input"
        value={directmsg.dcontent}
      ></textarea>
      <textarea
        className="Textarea"
        name="dcomment"
        onChange={onCh}
        value={drcomment}
      ></textarea>
      <div className="Buttons">
        <Button wsize="s-40" onClick={viewChange}>
          뒤로가기
        </Button>
        <Button type="submit" wsize="s-40">
          답변 등록
        </Button>
      </div>
    </form>
  );
};

export default DmView;
