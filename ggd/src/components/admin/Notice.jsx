import axios from "axios";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import Table from "./Table";
import Paging from "./Paging";
import Button from "../idealcup/Button";

const df = (date) => moment(date).format("YYYY-MM-DD");

const Notice = () => {
  const nav = useNavigate();
  const [aitem, setBitem] = useState({});
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  });

  const getnList = (pnum) => {
    axios
      .get("/notice", { params: { pageNum: pnum } })
      .then((res) => {
        const { bList, totalPage, pageNum } = res.data;
        setPage({ totalPage: totalPage, pageNum: pageNum });
        setBitem(bList);
        sessionStorage.setItem("pageNum", pageNum);
      })
      .catch((err) => console.log(err));
  };

  let list = null;
  if (aitem.length === 0) {
    list = (
      <TableRow key={0}>
        <TableColumn span={2}>공지사항이 없습니다</TableColumn>
      </TableRow>
    );
  } else {
    list = Object.values(aitem).map((item) => (
      <TableRow key={item.nnum}>
        <TableColumn wd="w-10">
          <div onClick={() => getNotice(item.nnum)}>{item.ntitle}</div>
        </TableColumn>
        <TableColumn wd="w-20">{df(item.rdate)}</TableColumn>
      </TableRow>
    ));
  }
  const getNotice = useCallback((nnum) => {
    nav("/notice", { state: { nn: nnum } });
  });

  return ( <div className="Main">
    <div className="Content">
      <h1>공지사항</h1>
      <Table hName={["제목", "날짜"]}>{list}</Table>
      <Paging page={page} getList={getnList} />
      <Button
        size="large"
        wsize="s-50"
        onClick={() => {
          nav("/write");
        }}
      >
        등록
      </Button>
    </div>
  </div>);
};

export default Notice;
