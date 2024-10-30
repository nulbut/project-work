import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./scss/Mypage.scss";
import Button from "../idealcup/Button";
import logo from "../images/logo.svg";

const Mypage = () => {
  const menuArr = [
    {
      name: "포인트",
      path: "mypage",
    },
    {
      name: "등록한 상품",
      path: "productRegistered",
    },
    {
      name: "주문내역/배송조회",
      path: "orderDelivery",
    },
    {
      name: "회원정보 수정",
      path: "/",
    },
    {
      name: "찜목록",
      path: "dibs",
    },
    {
      name: "내 문의내역",
      path: "inquiry",
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
          ..님
          <div>등급:</div>
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
            <Button type="submit" size="large" color="black">
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

export default Mypage;
