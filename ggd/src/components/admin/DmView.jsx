import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { AdminPageContextStore } from "./AdminPageStatus";
import axios from "axios";
import DmList from "./DmList";
import Button from "../idealcup/Button";

const df = (date) => moment(date).format("YYYY-MM-DD");
const DmView = ({ dnum }) => {
  const pageSt = useContext(AdminPageContextStore);

  const [directmsg, setDirectmsg] = useState({});
  const [flist, setFlist] = useState([
    {
      dfsysname: "",
      dforiname: "파일이 없습니다.",
      image: "",
    },
  ]);

  useEffect(() => {
    axios
      .get((res) => {
        console.log(res.data);
        setDirectmsg(res.data);

        if (res.data.dfList.length > 0) {
          let newFileList = [];
          for (let i = 0; i < res.data.dfList.length; i++) {
            const newFile = {
              ...res.data.dfList[i],
              image: "dupload/" + res.data.dfList[i].dfsysname,
            };
            newFileList.push(newFile);
          }
          setFlist(newFileList);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const viewChange = () => {
    console.log("DmView viewchange");
    pageSt.setViewPage(<DmList />);
  };

  const updateDm = () => {};

  return (
    <div className="Main">
      <div className="Content">
        <h1>1 : 1 문의</h1>
        <div className="DataArea">
          <div className="Box">
            {/* <div className="Data">{report.rnum}</div> */}
            <div className="Title">{directmsg.dtitle}</div>
            <div className="Text">{df(directmsg.rdate)}</div>
            <div className="ID">{directmsg.duid}</div>
            <div className="Text">{directmsg.dcontent}</div>
          </div>
          <div className="Box">
            <div className="comment">답변 작성</div>
          </div>
        </div>
        <div className="Buttons">
          <Button wsize="s-10" onClick={viewChange}>
            뒤로가기
          </Button>
          <Button wsize="s-10" color="red" onClick={updateDm}>
            처리완료
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DmView;
