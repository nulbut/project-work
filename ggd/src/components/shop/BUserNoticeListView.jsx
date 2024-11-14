import React, { useCallback, useEffect, useState, useContext } from "react";
import { AdminPageContextStore } from "../admin/AdminPageStatus";
import axios from "axios";
import moment from "moment";
import Table from "../admin/Table";
import TableColumn from "../admin/TableColumn";
import TableRow from "../admin/TableRow";
import Paging from "../admin/Paging";
// import NotieView from "/NoticeView";
import { useNavigate } from "react-router-dom";

const df = (date) => moment(date).format("YYYY-MM-DD");

const BUserNoticeListView = () => {
  const nav = useNavigate();
  const pnum = sessionStorage.getItem("pageNum");
  const [mitem, setMitem] = useState({});
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  });

  const pageSt = useContext(AdminPageContextStore);

  const getNlist = (pnum) => {
    axios
      .get("admin/notice", { params: { pageNum: pnum } })
      .then((res) => {
        const { nList, totalPage, pageNum } = res.data;
        console.log(res.data);
        setPage({ totalPage: totalPage, pageNum: pageNum });
        setMitem(nList);
        sessionStorage.setItem("pageNum", pageNum);
      })
      .catch((err) => console.log(err));
  };
  let list = null;
  if (mitem.length === 0) {
    list = (
      <TableRow key={0}>
        <TableColumn span={2}>공지사항이 없습니다</TableColumn>
      </TableRow>
    );
  } else {
    list = Object.values(mitem).map((item) =>
      item.isPinned ? (
        <TableRow key={item.nnum} bg="pinned">
          <TableColumn wd="w-10">
            <div onClick={() => getNotice(item.nnum)}>{item.ntitle}</div>
          </TableColumn>
          <TableColumn wd="w-20">{df(item.rdate)}</TableColumn>
        </TableRow>
      ) : (
        <TableRow key={item.nnum}>
          <TableColumn wd="w-10">
            <div onClick={() => getNotice(item.nnum)}>{item.ntitle}</div>
          </TableColumn>
          <TableColumn wd="w-20">{df(item.rdate)}</TableColumn>
        </TableRow>
      )
    );
  }
  console.log(mitem);
  const getNotice = useCallback((nnum) => {
    nav("/Notification/NoticeView", { state: { nnum: nnum } });
  });

  useEffect(() => {
    pnum !== null ? getNlist(pnum) : getNlist(1);
  }, []);

  //공지사항 메뉴로 이동
  const NotificationGo = () => {
    nav("/Notification");
  };
  return (
    <div className="bnserNoticeListView">
      <h1 onClick={NotificationGo}>공지사항</h1>
      <Table hName={["제목", "날짜"]}>{list}</Table>

      <Paging page={page} getList={getNlist} />
    </div>
  );
};

export default BUserNoticeListView;
