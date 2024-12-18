import React, { useContext, useState, useEffect } from "react";
import { AdminPageContextStore } from "../admin/AdminPageStatus";
import axios from "axios";
import moment from "moment";
import Button from "../idealcup/Button";
import Notification from "./Notification";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const df = (date) => moment(date).format("YYYY-MM-DD");

const NotificationView = () => {
  const location = useLocation(); // state로 전달된 데이터 받기
  const { nnum } = location.state; // state에서 nnum 받기
  console.log("nnum from state:", nnum);
  // const pageSt = useContext(AdminPageContextStore);
  const nav = useNavigate();
  const [notice, setNotice] = useState({});
  const [flist, setFlist] = useState([
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

  const viewChange = () => {
    console.log("noticeview viewchange");
    nav("/Notification", { state: { nnum: nnum } });
  };

  const viewFlist = flist.map((v, i) => {
    return (
      <div className="a-img" key={i}>
        {v.image && (
          <img
            src={v.image}
            alt="preview-img"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        )}
        {v.nforiname}
      </div>
    );
  });
  return (
    <div className="Main">
      <div className="Content">
        <div className="Title">
          {notice.ntitle} {df(notice.rdate)}
        </div>
        <div className="Cont">{notice.ncontent}</div>
        <div className="FileData">{viewFlist}</div>
        <div className="Buttons">
          <Button wsize="s-10" color="black" onClick={viewChange}>
            뒤로가기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationView;
