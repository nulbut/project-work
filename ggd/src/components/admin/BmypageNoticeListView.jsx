import React, { useCallback, useContext, useEffect, useState } from "react";
import Table from "./Table";
import TableRow from "../shop/TableRow";
import TableColumn from "../shop/TableColumn";
import axios from "axios";
import moment from "moment";
import Paging from "../shop/Paging";
import Button from "../idealcup/Button";
import Nwrite from "./Nwrite";
import { AdminPageContextStore } from "./AdminPageStatus";
import NotieView from "./NoticeView";

const df = (date) => moment(date).format("YYYY-MM-DD");

const BmypageNoticeListView = () => {
  const pnum = sessionStorage.getItem("pageNumNotice");
  const [aitem, setAitem] = useState({});
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  });

  const pageSt = useContext(AdminPageContextStore);

  const getnList = (pnum) => {
    axios
      .get("/admin/notice", { params: { pageNum: pnum } })
      .then((res) => {
        const { nList, totalPage, pageNum } = res.data;
        console.log(res.data);
        setPage({ totalPage: totalPage, pageNum: pageNum });
        setAitem(nList);
        sessionStorage.setItem("pageNumNotice", pageNum);
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
    list = Object.values(aitem).map((item) =>
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
  console.log(aitem);
  const getNotice = useCallback((nnum) => {
    pageSt.setViewPage(<NotieView nnum={nnum} />);
  });

  useEffect(() => {
    // if (!admin) {
    //     nav("/", { replace: true });
    //     return; // 로그인 안한 경우 첫 화면으로 이동
    // }
    pnum !== null ? getnList(pnum) : getnList(1);
  }, []);

  const moveMenu = () => {
    console.log("moveMenu()");
    pageSt.setViewPage(<Nwrite />);
  };

  return (
    <div className="Content">
      <Table hName={["제목", "날짜"]}>{list}</Table>

      <Paging page={page} getList={getnList} />
    </div>
  );
};

export default BmypageNoticeListView;
