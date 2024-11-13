import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Button from "../idealcup/Button";
import logo from "../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import inquiryiconnone from "../images/inquiryiconnone.svg";
import "./scss/BmypageView.scss";
import axios from "axios";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import BproductStockCheck from "./BproductStockCheck";
import BUserNoticeListView from "./BUserNoticeListView";
import BOderHistory from "./BOderHistory";

const BMypageView = (props) => {
  const nav = useNavigate();
  // console.log(props.onLogout);
  //...님에 상호 불러오게 하기
  const bcname = sessionStorage.getItem("nnickname");
  //아이디 불러오기
  const id = sessionStorage.getItem("bid");

  console.log(id);

  const productgo = () => {
    nav("/bmypage/bp1");
  };

  const odergo = () => {
    nav("/bmypage/boderhistory");
  };

  const inquirygo = () => {
    nav("/bmypage/binquiry");
  };

  const notificationgo = () => {
    nav("/Notification");
  };

  const menuArr = [
    {
      name: "마이페이지",
      path: "/bp0",
    },
    {
      name: "등록한 상품",
      path: "/bmypage/bp1",
    },
    {
      name: "주문내역/배송조회",
      path: "/bmypage/boderhistory",
    },
    {
      name: "재고관리",
      path: "/bmypage/bproductstock",
    },
    {
      name: "문의사항 관리",
      path: "/bmypage/binquiry",
    },
    {
      name: "사업자 정보",
      path: "/bmemberpasswordcheck",
    },
  ];

  //   const selectMenuHandler = (index) => {
  //     // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
  //     // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
  //     clickTab(index);
  //   };

  //합계건수들 불러오기 
  const [orders, setOrders] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmounts, setTotalAmounts] = useState(0);

  useEffect(() => {
    const paramData = {
      bid: sessionStorage.getItem("bid"),
    };
    axios
      .get("/getStoreOrders", { params: paramData })
      .then((res) => {
        setOrders(res.data);

        const orderData = [setOrders];

        // 합계 계산
        const totalQuantity = orderData.reduce((sum, order) => sum + order.quantity, 0);
        const totalAmounts = orderData.reduce((sum, order) => sum + order.totalAmount, 0);

        setTotalQuantity(totalQuantity); // 총 주문 수량
        setTotalAmounts(totalAmounts); // 총 매출 금액
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  

  return (
    <div className="mypage-ex">
      <div className="sideber">
        <div className="mypage">
          <p>
            마이페이지
            <img src={logo} />
          </p>
        </div>
        <div className="border-ber">
          {bcname}님
          {menuArr.map((butn, idx) => {
            return (
              <Link className="sideber-menu" to={butn.path} key={idx}>
                <Button type="submit" size="large" color="black">
                  {butn.name}
                </Button>
              </Link>
            );
          })}
          <div className="btn">
            <Button size="large" color="black" onClick={props.onLogout}>
              로그아웃
            </Button>
          </div>
        </div>
      </div>
      <div className="desc">
        <div className="oder">
          <Button className="button">주문완료</Button>
          <div onClick={odergo} className="count">
            {totalQuantity}건
          </div>
        </div>
        <div className="delivery">
          <Button className="button">배송준비</Button>
          <div onClick={odergo} className="count">
            {}건
          </div>
          <Button className="button">배송중</Button>
          <div onClick={odergo} className="count">
            {}건
          </div>
        </div>
        <div className="cancellation">
          <Button className="button">취소요청</Button>
          <div onClick={odergo} className="count">
            {}건
          </div>
        </div>
        <div className="revenue">
          <Button className="button">오늘 매출액</Button>
          <div className="count">{totalAmounts}건</div>
        </div>
        <div className="inquiry">
          <img onClick={inquirygo} src={inquiryiconnone} alt="" />
        </div>
        <div className="stockstatus">
          <Button className="button">재고상황</Button>

          <p>품절</p>
          <BproductStockCheck />
        </div>
        <div className="announcement">
          {/* 공지사항 */}
          <BUserNoticeListView className="bnserNoticeListView" />
        </div>
        
        <Outlet />
      </div>
    </div>
  );
};

export default BMypageView;
