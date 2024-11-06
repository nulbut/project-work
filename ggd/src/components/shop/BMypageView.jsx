import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./scss/Bmypage.scss";
import Button from "../idealcup/Button";
import logo from "../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import inquiryicon from "../images/inquiryicon.png";

const BMypageView = () => {
  return (
    <div className="mypage-ex">
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
