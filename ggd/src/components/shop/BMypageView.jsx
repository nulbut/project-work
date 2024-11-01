import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./scss/Bmypage.scss";
import Button from "../idealcup/Button";
import logo from "../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import inquiryicon from "../images/inquiryicon.png";

const BMypageView = () => {
  // //...님에 상호 불러오게 하기
  // const bcname = sessionStorage.getItem("nnickname");

  // const menuArr = [
  //   {
  //     name: "마이페이지",
  //     path: "/bmypage",
  //   },
  //   {
  //     name: "등록한 상품",
  //     path: "bp1",
  //   },
  //   {
  //     name: "주문내역/배송조회",
  //     path: "/",
  //   },
  //   {
  //     name: "재고관리",
  //     path: "/",
  //   },
  //   {
  //     name: "문의사항 관리",
  //     path: "/",
  //   },
  //   {
  //     name: "사업자 정보 변경",
  //     path: "/",
  //   },
  // ];

  // //   const selectMenuHandler = (index) => {
  // //     // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
  // //     // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
  // //     clickTab(index);
  // //   };
  return (
    <div className="mypage-ex">
      {/* <div className="sideber">
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
            <Button type="submit" size="large" color="black">
              로그아웃
            </Button>
          </div>
        </div>
      </div> */}
      <div className="desc">
        <div className="oder">
          <Button>주문완료</Button>
          <div className="count">건</div>
        </div>
        <div className="delivery">
          <Button>배송준비</Button>
          <div className="count">건</div>
          <Button>배송중</Button>
          <div className="count">건</div>
        </div>
        <div className="cancellation">
          <Button>취소요청</Button>
          <div className="count">건</div>
          <Button>반품요청</Button>
          <div className="count">건</div>
          <Button>교환요청</Button>
          <div className="count">건</div>
        </div>
        <div className="revenue">
          <Button>오늘 매출액</Button>
          <div className="count">건</div>
        </div>
        <div className="inquiry">
          <img src={inquiryicon} alt="" />
        </div>
        <div className="stockstatus">
          <table>
            <tr>재고상황</tr>
            <td>
              <Button>품절</Button>
            </td>
            <td>
              <Button>통보수량초과</Button>
            </td>
          </table>
        </div>
        <div>공지사항</div>
        <Outlet />
      </div>
    </div>
  );
};

export default BMypageView;
