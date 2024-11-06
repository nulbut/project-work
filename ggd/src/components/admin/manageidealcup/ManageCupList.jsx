import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TableRow from "../TableRow";
import TableColumn from "../TableColumn";
import "../scss/ManageCupList.scss";
import {
  faCircleExclamation,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../idealcup/Button";
import Table from "../Table";
import Paging from "../Paging";

const df = (date) => moment(date).format("YYYY-MM-DD HH:mm:ss");

const ManageCupList = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState({
    //페이징 관련 정보 저장 state
    totalPage: 0,
    pageNum: 1,
  });
  const pnum = sessionStorage.getItem("pageNum");
  const nav = useNavigate();
  const fetchGoods = (pnum) => {
    axios
      .get("/list", { params: { pageNum: pnum } })
      .then((res) => {
        const { bList, totalPage, pageNum } = res.data;
        setPage({ totalPage: totalPage, pageNum: pageNum });
        setGames(bList);
      })
      .catch((err) => console.log(err));
  };
  console.log(games);
  const options = [
    { value: "iwcName", label: "제목" },
    { value: "iwcExplanation", label: "내용" },
  ];

  useEffect(() => {
    pnum !== null ? fetchGoods(pnum) : fetchGoods(1);
  }, []);

  //출력할 게시글 목록 작성
  let list = null;
  if (games.length === 0) {
    list = (
      <TableRow key={0}>
        <TableColumn span={4}>게시글이 없습니다.</TableColumn>
      </TableRow>
    );
  } else {
    list = Object.values(games).map((item) => (
      <TableRow key={item.iwcCode}>
        <TableColumn wd="w-10">{item.iwcCode}</TableColumn>
        <TableColumn wd="w-40">
          <div onClick={() => getBoard(item.iwcCode)}>{item.iwcName}</div>
        </TableColumn>
        <TableColumn wd="w-20">{item.iwcAuthor}</TableColumn>
        <TableColumn wd="w-30">{df(item.iwcDate)}</TableColumn>
      </TableRow>
    ));
  }

  const getBoard = (code) => {
    nav("/game", { state: { iwcCode: code } }); //'/board?bn=1'
  }; //상세보기 화면으로 전환될 때 게시글 번호를 보낸다.

  return (
    <div className="idealmain">
      <h1>월드컵 리스트</h1>

      <div className="table-wrapper">
        <Table hName={["번호", "이름", "작성자", "작성일", "가입날짜", "비고"]}>
          {list}
        </Table>
      </div>

      <div className="paging-wrapper">
        <Paging page={page} getList={fetchGoods} />
      </div>
    </div>
  );
};
export default ManageCupList;
