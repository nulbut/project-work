import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./scss/Main.scss";
import axios from "axios";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import CartBoard from "./CartBoard";
import Button from "./Button";
import Paging from "./Paging";

const df = (data) => moment(data).format("YYYY-MM-DD");

const Cart = () => {
  const nav = useNavigate();
  const cnid = sessionStorage.getItem("nid");
  const pnum = sessionStorage.getItem("pageName");
  const [citem, setCitem] = useState({});
  console.log(citem);
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  });

  //서버로부터 장바구니 가져오는 함수
  const getCartList = (pnum) => {
    axios
      .get("/cartlist", { params: { pageNum: pnum, cnid: cnid } })
      .then((res) => {
        const { Clist, totalPage, pageNum, cnid } = res.data;
        console.log(totalPage);
        setPage({ totalPage: totalPage, pageNum: pageNum });
        console.log(page);
        setCitem(Clist);
        console.log(Clist);
        sessionStorage.getItem("pageNum", pageNum);
      })
      .catch((err) => console.log(err));
  };

  //Cart 컴포넌트가 화면에 보일 떄 서버로부터 문의게시글 목록을 가져온다.
  useEffect(() => {
    console.log(cnid);
    if (cnid === null) {
      alert("로그인이 필요합니다.");
      nav("/login", { replace: true });
      return;
    }
    pnum !== null ? getCartList(pnum) : getCartList(1);
  }, []);

  //출력할 장바구니 목록 작성
  let cartList = null;
  if (citem.length === 0) {
    cartList = (
      <TableRow key={0}>
        <TableColumn span={5}>장바구니 목록이 없습니다.</TableColumn>
      </TableRow>
    );
  } else {
    cartList = Object.values(citem).map((item) => (
      <TableRow key={item.cartCode}>
        <TableColumn wd="10">{item.productCode}</TableColumn>
        <TableColumn wd="30">
          <div onClick={() => getCart(item.productCode)}></div>
          {item.productName}
        </TableColumn>
        <TableColumn wd="15">{item.quantity}</TableColumn>
        <TableColumn wd="20">₩{item.sellerPayment}</TableColumn>
        <TableColumn wd="10">
          <Button size="small">삭제</Button>
        </TableColumn>
      </TableRow>
    ));
  }

  const getCart = (cnid) => {
    nav("", { state: { bc: cnid } });
  };
  return (
    <div className="Main">
      <div className="Content">
        <h1>장바구니</h1>
        <CartBoard cName={["번호", "상품", "수량", "가격", "관리"]}>
          {cartList}
        </CartBoard>
        <Paging page={page} getList={getCartList} />
        <Button size="large" wsize="s-50" onClick={() => nav("/shoppingMall")}>
          홈으로
        </Button>
      </div>
    </div>
  );
};

export default Cart;
