import axios from "axios";
import moment from "moment";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NoticeList from "./NoticeList";
import { AdminPageContextStore } from "./AdminPageStatus";
import Button from "../idealcup/Button";

const df = (date) => moment(date).format("YYYY-MM-DD");

const NotieView = ({ nnum }) => {
  const pageSt = useContext(AdminPageContextStore);

  const [notice, setNotice] = useState({});
  const [filst, setFlist] = useState([
    {
      nfnum: 0,
      nfnid: 0,
      nfsysname: "",
      nforiname: "파일이 없습니다.",
      image: "",
    },
  ]);

  useEffect(() => {
    axios
      .get("/admin/getNotice", { params: { nnum: nnum } })
      .then((res) => {
        console.log(res.data);
        setNotice(res.data);

        if (res.data.nfList.length > 0) {
          let newFileList = [];
          for (let i = 0; i < res.data.nfList.length; i++) {
            const newFile = {
              ...res.data.nfList[i],
              image: "nupload/" + res.data.nfList[i].nfSysname,
            };
            newFileList.push(newFile);
          }
          setFlist(newFileList);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteNotice = useCallback(() => {
    let conf = window.confirm("삭제 할까요?");
    if (!conf) {
      return;
    }

    axios
      .post("/admin/deleteNotice", null, { params: { nnum: nnum } })
      .then((res) => {
        if (res.data.res === "ok") {
          alert("삭제 완료");
          viewChange();
        } else {
          alert("삭제 실패");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const viewChange = () => {
    console.log("noticeview viewchange");
    pageSt.setViewPage(<NoticeList />);
  };

  const updateBoard = () => {};

  const viewFlist = filst.map((v, i) => {
    return (
      <div className="Down" key={i}>
        {v.image && <img src={v.image} alt="preview-img" />}
        {v.nforiname}
      </div>
    );
  });

  return (
    <div className="Notice">
      <div className="Content">
        <h1>{notice.ntitle}</h1>

        <div className="DataArea">
          <div className="Box">
            <div className="Title">날짜</div>
            <div className="Data">{df(notice.rdate)}</div>
          </div>
          <div className="Cont">{notice.ncontent}</div>
          <div className="Box">
            <div className="FileTitle">File</div>
            <div className="FileData">{viewFlist}</div>
          </div>
        </div>

        <div className="Buttons">
          <Button wsize="s-10" onClick={viewChange}>
            뒤로가기
          </Button>
          <Button wsize="s-10" color="red" onClick={updateBoard}>
            수정
          </Button>
          <Button wsize="s-10" color="red" onClick={deleteNotice}>
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotieView;
