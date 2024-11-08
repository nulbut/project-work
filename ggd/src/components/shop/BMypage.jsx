import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./scss/Bmypage.scss";
import Button from "../idealcup/Button";
import logo from "../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import inquiryicon from "../images/inquiryicon.png";

const BMypage = (props) => {
  // console.log(props.onLogout);
  //...님에 상호 불러오게 하기
  const bcname = sessionStorage.getItem("nnickname");
  //아이디 불러오기
  const id = sessionStorage.getItem("bid");

  console.log(id);

  const menuArr = [
    {
      name: "마이페이지",
      path: "/bp0",
    },
    {
      name: "등록한 상품",
      path: "bp1",
    },
    {
      name: "주문내역/배송조회",
      path: "boderhistory",
    },
    {
      name: "재고관리",
      path: "bproductstock",
    },
    {
      name: "문의사항 관리",
      path: "binquiry",
    },
    {
      name: "사업자 정보 변경",
      path: "bmemberpasswordcheck",
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
          {bcname}님<div>등급:</div>
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
        <Outlet />
      </div>
    </div>
  );
};

export default BMypage;
