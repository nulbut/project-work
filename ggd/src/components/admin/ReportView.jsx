import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { AdminPageContextStore } from "./AdminPageStatus";
import axios from "axios";
import ReportList from "./ReportList";
import Button from "../idealcup/Button";

const df = (date) => moment(date).format("YYYY-MM-DD");
const ReportView = ({ rnum }) => {
  const pageSt = useContext(AdminPageContextStore);

  const [report, setReport] = useState({});
  const [flist, setFlist] = useState([
    {
      rfsysname: "",
      rforiname: "파일이 없습니다.",
      image: "",
    },
  ]);

  useEffect(() => {
    axios
      .get("/admin/getReport", { params: { rNum: rnum } })
      .then((res) => {
        console.log(res.data);
        setReport(res.data);

        if (res.data.rfList.length > 0) {
          let newFileList = [];
          for (let i = 0; i < res.data.rfList.length; i++) {
            const newFile = {
              ...res.data.rfList[i],
              image: "rupload/" + res.data.rfList[i].rfsysname,
            };
            newFileList.push(newFile);
          }
          setFlist(newFileList);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const viewChange = () => {
    console.log("ReportView viewchange");
    pageSt.setViewPage(<ReportList />);
  };

  const updateReport = () => {};

  return (
    <div className="Main">
      <div className="Content">
        <h1>신고함</h1>
        <div className="DataArea">
          <div className="Box">
            {/* <div className="Data">{report.rnum}</div> */}
            <div className="Title">{report.rtitle}</div>
            <div className="Text">{report.rcontent}</div>
            <div className="ID">{report.ruid}</div>
            <div className="Text">{df(report.rdate)}</div>
          </div>
        </div>
        <div className="Buttons">
          <Button wsize="s-10" onClick={viewChange}>
            뒤로가기
          </Button>
          <Button wsize="s-10" color="red" onClick={updateReport}>
            처리완료
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportView;