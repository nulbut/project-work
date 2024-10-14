import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import GameViewLayout from "./GameViewLayout";

import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import Paging from "./Paging";

const df = (date) => moment(date).format("YYYY-MM-DD HH:mm:ss");

const IdealcupMain = () => {
  const nav = useNavigate();
  // const mid = sessionStorage.getItem("mid");
  const mid = "asd"; //로그인 구현 전 임시

  // const ps = useContext(PageContextStore);
  //console.log(ps);

  const options = [
    { value: "iwcName", label: "제목" },
    { value: "iwcExplanation", label: "내용" },
  ];

  const [bitem, setBitem] = useState({}); //빈 객체로 초기화(한 게시글 정보를 저장)
  const [page, setPage] = useState({
    //페이징 관련 정보 저장 state
    totalPage: 0,
    pageNum: 1,
  });

  //서버로부터 게시글 목록을 가져오는 함수
  const getList = (page) => {
    // const paramData = {
    //   column: ps.searchColumn,
    //   keyword: ps.searchKeyword,
    // };
    console.log("test");
    // .get("/list", { params: { ...paramData, pageNum: page } })
    axios
      .get("/list", { params: { pageNum: page } })
      .then((res) => {
        const { bList, totalPage, pageNum } = res.data;
        setPage({ totalPage: totalPage, pageNum: pageNum });
        setBitem(bList);
        // ps.setPageNum(pageNum);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (mid === null) {
      nav("/", { replace: true });
      return; //로그인 안한 경우 첫 화면으로 이동.
    }
    // ps.pageNum !== null ? getList(ps.pageNum) : getList(1);
    getList(1);
  }, []);

  //출력할 게시글 목록 작성
  let list = null;
  if (bitem.length === 0) {
    list = (
      <TableRow key={0}>
        <TableColumn span={4}>게시글이 없습니다.</TableColumn>
      </TableRow>
    );
  } else {
    list = Object.values(bitem).map((item) => (
      <TableRow key={item.iwcCode}>
        <TableColumn wd="w-10">{item.iwcCode}</TableColumn>
        <TableColumn wd="w-40">
          <div onClick={() => getBoard(item.iwcCode)}>{item.iwcName}</div>
        </TableColumn>
        <TableColumn wd="w-20">{item.iwcAuthor}</TableColumn>
        <TableColumn wd="w-30">{df(item.rdate)}</TableColumn>
      </TableRow>
    ));
  }

  const getBoard = (code) => {
    nav("/game", { state: { iwcCode: code } }); //'/board?bn=1'
  }; //상세보기 화면으로 전환될 때 게시글 번호를 보낸다.

  return (
    <div>
      <GameViewLayout hName={["NO", "Title", "Writer", "Date"]}>
        {list}
      </GameViewLayout>
      이상형월드컵
      <Link to="/game">게임하러가기</Link>
    </div>
  );
};

export default IdealcupMain;
