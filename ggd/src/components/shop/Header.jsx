import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faMagnifyingGlass, faUser,faBagShopping,faHeart} from "@fortawesome/free-solid-svg-icons";


const Header = () => {
  
  return <div>
    <Link to="/ShoppingMall">GGD'S</Link>
    <Link to ="/Idlecup"> <img src={logo}></img> </Link>
    <FontAwesomeIcon icon={faList} />
    <Link to= "/Hot_Product">인기상품</Link>&nbsp;
    <Link to= "/Latest_Product">최신상품</Link>&nbsp; 
    <Link to= "/New_Product">신상품</Link>&nbsp;
    <Link to= "/Used_Product">중고상품</Link>&nbsp; 
    <Link to= "/Notification">공지사항</Link>&nbsp; 
    <input type="text" placeholder="검색"/><FontAwesomeIcon icon={faMagnifyingGlass} />&nbsp;
    <Link to= "/Mypage"><FontAwesomeIcon icon={faUser} style={{color: "#000000",}} /></Link>&nbsp;
    <Link to= "/Cart"><FontAwesomeIcon icon={faBagShopping} style={{color: "#000000",}} /></Link>&nbsp;
    <Link to= "/Dibs"><FontAwesomeIcon icon={faHeart} style={{color: "#000000",}} /></Link>&nbsp;
    <Link to= "/Login">로그인</Link>&nbsp; 
    <Link to= "/Join">회원가입</Link>&nbsp; 
    <Link to= "/OrderDelivery">주문/배송</Link>&nbsp; 
    <Link to= "/Inquiry">Q&A</Link>&nbsp; 
    

  </div>;
};

export default Header;
