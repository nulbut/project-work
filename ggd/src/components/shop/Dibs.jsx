import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./scss/Main.scss";
import axios from "axios";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import DibsBoard from "./DibsBoard";
import Button from "./Button";
import Paging from "./Paging";

const df = (data) => moment(data).format("YYYY-MM-DD");

const Dibs = () => {
  const nav = useNavigate();
  const dnid = sessionStorage.getItem("nid");
  const pnum = sessionStorage.getItem("pageNum");
  const [ditem, setDitem] = useState({});
  console.log(ditem);
  const [page, setPage] = useState({
    //페이징 관련 정보 저장 state
    totalPage: 0,
    pageNum: 1,
  });

  //서버로부터 찜목록 가져오는 함수
  const getDibsList = (pnum) => {
    axios
      .get("/dibslist", { params: { pageNum: pnum, dnid: dnid } })
      .then((res) => {
        const { Dlist, totalPage, pageNum, dnid } = res.data;
        console.log(totalPage);
        setPage({ totalPage: totalPage, pageNum: pageNum });
        console.log(page);
        setDitem(Dlist);
        console.log(Dlist);
        sessionStorage.getItem("pageNum", pageNum);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(dnid);
    if (dnid === null) {
      alert("로그인이 필요합니다.");
      nav("/login", { replace: true });
      return;
    }
    pnum !== null ? getDibsList(pnum) : getDibsList(1);
  }, []);

  //출력할 찜목록 작성
  let dibsList = null;
  if (ditem.length === 0) {
    dibsList = (
      <TableRow key={0}>
        <TableColumn span={5}>찜 목록이 없습니다.</TableColumn>
      </TableRow>
    );
  } else {
    dibsList = Object.values(ditem).map((item) => (
      <TableRow key={item.dibsCode}>
        <TableColumn wd="10">{item.productCode}</TableColumn>
        <TableColumn wd="40">
          <div onClick={() => getDibs(item.productCode)}>
            <img
              src={`../upload/${item.productinfo?.productFileList[0]?.productFileSysname}`}
            />
            {item.productinfo.productName}
          </div>
        </TableColumn>
        <TableColumn wd="30">{item.productinfo.sellerPayment}₩</TableColumn>
        <TableColumn wd="20">{df(item.dibsDate)}</TableColumn>
        <TableColumn wd="20">
          <Button size="small">삭제</Button>
        </TableColumn>
      </TableRow>
    ));
  }
  const getDibs = (dnid) => {
    nav("", { state: { dc: dnid } });
  };
  return (
    <div className="Main">
      <div className="Content">
        <h1>찜목록</h1>
        <DibsBoard dName={["번호", "상품", "가격", "등록일", "여부"]}>
          {dibsList}
        </DibsBoard>
        <Paging page={page} getList={getDibsList} />
        <Button size="large" wsize="s-50" onClick={() => nav("/shoppingMall")}>
          홈으로
        </Button>
      </div>
    </div>
  );
};

export default Dibs;
