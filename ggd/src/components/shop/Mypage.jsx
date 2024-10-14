import React from 'react';
import { Link } from 'react-router-dom';
import "./scss/Mypage.scss";
import  Button from "../idealcup/Button";
import logo from "../images/logo.svg";
import RegisteredProduct from './RegisteredProduct';
// import UsedproductRegistration from "./UsedproductRegistration"; //마이페이지 등록한 상품 페이지에 들어갈거

const Mypage = () => {
    const buttons =[
        {
            name: "마이페이지",
            path: "/mypage",
        },
        {
            name: "등록한 상품",
            path: "/",
        },
        {
            name: "주문내역/배송조회",
            path: "/OrderDelivery",
        },
        {
            name: "회원정보 수정",
            path: "",
        },
        {
            name: "찜목록",
            path: "",
        },
        {
            name: "내 문의 내역",
            path: "",
        },
    ]
    return (
        <div>
            마이페이지
        </div>
    );
};

export default Mypage;