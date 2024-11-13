import React, { useCallback, useContext, useEffect, useState } from "react";
import Table from "../admin/Table";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import axios from "axios";
import moment from "moment";
import Paging from "./Paging";
import Button from "../idealcup/Button";
import Nwrite from "../admin/Nwrite";
import { AdminPageContextStore } from "../admin/AdminPageStatus";
import NotieView from "../admin/NoticeView";

const df = (date) => moment(date).format("YYYY-MM-DD");

const UserNoticeListView = () => {
  const [aitem, setAitem] = useState([]);
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  });

  const pageSt = useContext(AdminPageContextStore);

  const getnList = useCallback((pnum = 1) => {
    axios
      .get("/admin/notice", { params: { pageNum: pnum, pageSize: 5 } })
      .then((res) => {
        const { nList, totalPage, pageNum } = res.data;
        setPage({ totalPage, pageNum });
        setAitem(nList);
        sessionStorage.setItem("pageNumNotice", pageNum);
      })
      .catch((err) => console.log(err));
  }, []);

  const list =
    aitem.length === 0 ? (
      <TableRow key={0}>
        <TableColumn span={2}>공지사항이 없습니다</TableColumn>
      </TableRow>
    ) : (
      aitem.map((item) => (
        <TableRow key={item.nnum} bg={item.isPinned ? "pinned" : undefined}>
          <TableColumn wd="w-10">
            <div onClick={() => getNotice(item.nnum)}>{item.ntitle}</div>
          </TableColumn>
          <TableColumn wd="w-20">{df(item.rdate)}</TableColumn>
        </TableRow>
      ))
    );

  const getNotice = useCallback(
    (nnum) => {
      pageSt.setViewPage(<NotieView nnum={nnum} />);
    },
    [pageSt]
  );

  useEffect(() => {
    const savedPageNum = sessionStorage.getItem("pageNumNotice") || 1;
    getnList(savedPageNum);
  }, [getnList, page.pageNum]);

  const moveMenu = () => {
    pageSt.setViewPage(<Nwrite />);
  };

  return (
    <div className="Content">
      <h1>공지사항</h1>
      {/* <Button size="small" wsize="s-50" onClick={moveMenu}>
        등록
      </Button> */}
      <Table hName={["제목", "날짜"]}>{list}</Table>
      <Paging page={page} getList={getnList} />
    </div>
  );
};

export default UserNoticeListView;
