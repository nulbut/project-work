import React, { useCallback, useContext, useEffect, useState } from "react";
import { AdminPageContextStore } from "./AdminPageStatus";
import axios from "axios";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import moment from "moment";
import NotieView from "./NoticeView";
import Table from "./Table";
import Paging from "./Paging";
import ReportView from "./ReportView";

const df = (date) => moment(date).format("YYYY-MM-DD");

const ReportList = () => {
  const pnum = sessionStorage.getItem("pageNum");
  const [aitem, setAitem] = useState({});
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  });

  const pageSt = useContext(AdminPageContextStore);

  const getrList = (pnum) => {
    axios
      .get("/admin/report", { params: { pageNum: pnum } })
      .then((res) => {
        const { rList, totalPage, pageNum } = res.data;
        setPage({ totalPage: totalPage, pageNum: pageNum });
        setAitem(rList);
        sessionStorage.setItem("pageNum", pageNum);
      })
      .catch((err) => console.log(err));
  };

  let list = null;
  if (aitem.length === 0) {
    list = (
      <TableRow key={0}>
        <TableColumn span={5}>신고함이 비어있습니다.</TableColumn>
      </TableRow>
    );
  } else {
    list = Object.values(aitem).map((item) => (
      <TableRow key={item.rnum}>
        <TableColumn wd="w-10">{item.rnum}</TableColumn>
        <TableColumn wd="w-20">
          <div onClick={() => getReport(item.rnum)}>{item.rtitle}</div>
        </TableColumn>
        <TableColumn wd="30">{item.ruid}</TableColumn>
        <TableColumn wd="40">{df(item.rdate)}</TableColumn>
        <TableColumn wd="50">
          <select>
            <option selected={item.rState === "" ? true : false}></option>
            <option selected={item.rState === "" ? true : false}></option>
          </select>
        </TableColumn>
      </TableRow>
    ));
  }

  const getReport = useCallback((rnum) => {
    pageSt.setViewPage(<ReportView rnum={rnum} />);
  });

  useEffect(() => {
    // if (!admin) {
    //     nav("/", { replace: true });
    //     return; // 로그인 안한 경우 첫 화면으로 이동
    // }
    pnum !== null ? getrList(pnum) : getrList(1);
  }, []);

  return (
    <div>
      <h1>신고함</h1>
      <Table hName={["번호", "제목", "ID", "날짜", "처리여부"]}>{list}</Table>
      <Paging page={page} getList={getrList} />
    </div>
  );
};

export default ReportList;
