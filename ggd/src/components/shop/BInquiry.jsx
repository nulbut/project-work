import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminPageContextStore } from "../admin/AdminPageStatus";
import DmList from "../admin/DmList";
import axios from "axios";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import moment from "moment";
import Button from "./Button";


const df = (data) => moment(data).format("YYYY-MM-DD");

const BInquiry = () => {
  const nav = useNavigate();
  const pageSt = useContext(AdminPageContextStore);
  const pnum = sessionStorage.getItem("pageNum");
  const bnid = sessionStorage.getItem("nid");
  const [iitem, setIitem] = useState({});
  const [page, setPage] = useState({
    //페이징 관련 정보 저장 state
    totalPage: 0,
    pageNum: 1,
  });

  //서버에서 문의글 가져오기 
  const getinquriy = (pnum) => {
    axios
      .get("/boardlist",{ params: { pageNum: pnum, bnid: bnid } })
      .then((res) => {
        const {Blist, totalPage, pageNum, nid} = res.data;
        console.log(totalPage);
        setPage({totalPage: totalPage, pageNum: pageNum});
        console.log(page);
        setIitem(Blist);
        console.log(Blist);
        sessionStorage.getItem("pageNum", pageNum);
      })
      .catch((err) => console.log(err));
  };

  //출력할 문의게시글 목록 작성
  let boardList = null;
  if (iitem.length === 0) {
    boardList = (
      <TableRow key={0}>
        <TableColumn span={5}>문의게시글이 없습니다.</TableColumn>
      </TableRow>
    );
  } else {
    boardList = Object.values(iitem).map((column, index) => (
      <TableRow key={column.boardCode}>
        <TableColumn wd="w-10">{index + 1}</TableColumn>
        <TableColumn wd="w-40">
          <div onClick={() => getBoard(column.boardCode)}>
            {column.boardTitle}
          </div>
        </TableColumn>
        <TableColumn wd="w-20">{column.bnid}</TableColumn>
        <TableColumn wd="w-30">{df(column.boardDate)}</TableColumn>
        <TableColumn wd="w-30">답변 미완료</TableColumn>
      </TableRow>
    ));
  }
  const getBoard = (bnid) => {
    nav("inView", { state: { bc: bnid } });
  }; //상세보기 화면으로 전환될 때 문의게시글 번호로 보낸다.

  useEffect(() => {
    pageSt.setViewPage(<DmList />);
  }, []);

  const buttons = [
    {
      name: "답변하기",
    },
  ];

  const viewChange = () => {
    console.log("viewChange");
    pageSt.setViewPage(<DmList />);
  };

  return <div className="Main">
    <div>{pageSt.viewPage}</div>
    <hr />
    <div><Button onClick={buttons}>답변하기</Button></div>
    
    </div>;
};

export default BInquiry;
