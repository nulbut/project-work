import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./scss/Main.scss";
import axios from "axios";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import InquiryBoard from "./InquiryBoard";
import Button from "./Button";
import Paging from "./Paging";

const df = (data) => moment(data).format("YYYY-MM-DD");

const Inquiry = () => {
  const nav = useNavigate();
  const bnid = sessionStorage.getItem("nid");
  const pnum = sessionStorage.getItem("pageNum");
  const [iitem, setIitem] = useState({});
  const [page, setPage] = useState({
    //페이징 관련 정보 저장 state
    totalPage: 0,
    pageNum: 1,
  });

  //서버로부터 문의게시글 가져오는 함수
  const getBoardList = (pnum) => {
    axios
      .get("/boardlist", { params: { pageNum: pnum } })
      .then((res) => {
        const { Blist, totalPage, pageNum } = res.data;
        console.log(totalPage);
        setPage({ totalPage: totalPage, pageNum: pageNum });
        console.log(page);
        setIitem(Blist);
        sessionStorage.getItem("pageNum", pageNum);
      })
      .catch((err) => console.log(err));
  };

  //Inquiry 컴포넌트가 화면에 보일 떄 서버로부터 문의게시글 목록을 가져온다.
  useEffect(() => {
    console.log(bnid);
    if (bnid === null) {
      nav("/login", { replace: true });
      return;
    }
    pnum !== null ? getBoardList(pnum) : getBoardList(1);
  }, []);
  //출력할 문의게시글 목록 작성
  let boardList = null;
  if (iitem.length === 0) {
    boardList = (
      <TableRow key={0}>
        <TableColumn span={5}>문의게시글이 없습니다.</TableColumn>
      </TableRow>
    );
  } else {
    boardList = Object.values(iitem).map((column) => (
      <TableRow key={column.boardCode}>
        <TableColumn wd="w-10">{column.boardCode}</TableColumn>
        <TableColumn wd="w-40">
          <div onClick={() => getBoard(column.boardCode)}>
            {column.boardTitle}
          </div>
        </TableColumn>
        <TableColumn wd="w-20">{column.bnid}</TableColumn>
        <TableColumn wd="w-30">{df(column.boardDate)}</TableColumn>
        <TableColumn wd="w-30">{df(column.boardDate)}</TableColumn>
      </TableRow>
    ));
  }

  const getBoard = (boardCode) => {
    nav("inView", { state: { bc: boardCode } });
  }; //상세보기 화면으로 전환될 때 문의게시글 번호로 보낸다.

  return (
    <div className="Main">
      <div className="Content">
        <h1>1:1 문의 게시판</h1>
        <InquiryBoard bName={["번호", "제목", "작성자", "날짜", "문의 현황"]}>
          {boardList}
        </InquiryBoard>
      </div>
      <Paging page={page} getList={getBoardList} />
      <Button
        size="large"
        wsize="s-50"
        onClick={() => {
          nav("/mypage/inquiryWrite");
        }}
      >
        글작성
      </Button>
    </div>
  );
};

export default Inquiry;
