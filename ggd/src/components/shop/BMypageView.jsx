import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Button from "../idealcup/Button";
import logo from "../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import inquiryicon from "../images/inquiryicon.png";
import "./scss/BmypageView.scss";

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
  }

  const odergo = () =>{
    nav("/bmypage/boderhistory");
  }

  const stockgo = () => {
    nav("/bmypage/bproductstock");
  }

  const inquirygo = () => {
    nav("/bmypage/binquiry");
  }

  const notificationgo = () => {
    nav("/Notification");
  }

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
          <Button>주문완료</Button>
          <div onClick={odergo} className="count">{}건</div>
        </div>
        <div className="delivery">
          <Button>배송준비</Button>
          <div onClick={odergo} className="count">{}건</div>
          <Button>배송중</Button>
          <div onClick={odergo} className="count">{}건</div>
        </div>
        <div className="cancellation">
          <Button>취소요청</Button>
          <div  onClick={odergo} className="count">{}건</div>

        </div>
        <div className="revenue">
          <Button>오늘 매출액</Button>
          <div className="count">{}건</div>
        </div>
        <div className="inquiry">
          <img onClick={inquirygo} src={inquiryicon} alt="" />
        </div>
        <div className="stockstatus">
          <table>
            <tr>재고상황</tr>
            <td>
              <Button>품절</Button>
              <div onClick={stockgo}>{}</div>
            </td>
            <td>
              <Button>통보수량초과</Button>
              <div onClick={stockgo}>{}</div>
            </td>
          </table>
        </div>
        <div className="announcement">공지사항</div>

        <Outlet />
      </div>
    </div>
  );
};

export default BMypageView;
