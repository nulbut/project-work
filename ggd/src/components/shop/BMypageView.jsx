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
import { get } from "jquery";

const BMypageView = ({ onLogout,paymentStatus }) => {
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
  // API 호출하여 데이터 가져오기
  const [totalAmount, setTotalAmount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Axios로 API 호출하여 데이터 가져오기
    const fetchPaymentStatusSummary = async () => {
      try {
        const response = await 
        axios
        .get("/payment-status-summary", {
          params: { paymentStatus }, // 쿼리 파라미터로 paymentStatus 전달
        });

        // 응답 데이터 처리
        const data = response.data;
        setTotalAmount(data.totalAmount);
        setOrderCount(data.orderCount);
      } catch (err) {
        setError('API 요청에 실패했습니다: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatusSummary();
  }, [paymentStatus]); // paymentStatus가 변경될 때마다 데이터 갱신

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류가 발생했습니다: {error}</div>;
  }

  

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
            <Button size="large" color="black" onClick={onLogout}>
              로그아웃
            </Button>
          </div>
        </div>
      </div>
      <div className="desc">
        <div className="oder">
          <Button className="button">주문완료</Button>
          <div onClick={odergo} className="count">
            {orderCount}건
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
          <div className="count">{totalAmount}건</div>
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
