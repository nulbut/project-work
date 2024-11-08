import React, { useCallback, useContext, useEffect, useState } from "react";
import { AdminPageContextStore } from "./AdminPageStatus";
import axios from "axios";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import DmView from "./DmView";
import moment from "moment";
import Paging from "./Paging";
import Table from "./Table";

const df = (date) => moment(date).format("YYYY-MM-DD");

const DmList = () => {
  const pnum = sessionStorage.getItem("pageNum");
  const [aitem, setAitem] = useState({});
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  });

  const pageSt = useContext(AdminPageContextStore);

  const getdList = (pnum) => {
    axios
      .get("/admin/dm", { params: { pageNum: pnum } })
      .then((res) => {
        const { dList, totalPage, pageNum } = res.data;
        setPage({ totalPage: totalPage, pageNum: pageNum });
        setAitem(dList);
        sessionStorage.setItem("pageNum", pageNum);
      })
      .catch((err) => console.log(err));
  };

  let list = null;
  if (aitem.length === 0) {
    list = (
      <TableRow key={0}>
        <TableColumn span={5}>문의가 없습니다.</TableColumn>
      </TableRow>
    );
  } else {
    list = Object.values(aitem).map((item) => (
      <TableRow key={item.dnum}>
        <TableColumn wd="w-10">{item.dnum}</TableColumn>
        <TableColumn wd="w-20">
          <div onClick={() => getDm(item.dnum)}>{item.dtitle}</div>
        </TableColumn>
        <TableColumn wd="30">{item.duid}</TableColumn>
        <TableColumn wd="40">{df(item.rdate)}</TableColumn>
        <TableColumn wd="50">{item.dstatus}</TableColumn>
      </TableRow>
    ));
  }

  const getDm = useCallback((dnum) => {
    pageSt.setViewPage(<DmView dnum={dnum} />);
  });

  useEffect(() => {
    // if (!admin) {
    //     nav("/", { replace: true });
    //     return; // 로그인 안한 경우 첫 화면으로 이동
    // }
    pnum !== null ? getdList(pnum) : getdList(1);
  }, []);

  return (
    <div>
      <h1>1 : 1 문의함</h1>
      <Table hName={["번호", "제목", "ID", "날짜", "답변여부"]}>{list}</Table>
      <Paging page={page} getList={getdList} />
    </div>
  );
};

export default DmList;
