import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faMagnifyingGlass, faUser,faBagShopping,faHeart} from "@fortawesome/free-solid-svg-icons";
import "./scss/Header.scss";



const Header = () => {
  const menus = [
    {
      name: "GGD'S",
      path: "ShoppingMall",
    },
    {
      path: "/Idlecup",
      img: "../images/logo.svg"
    },
    {
      path: "/",
      icon:<FontAwesomeIcon icon={faList} />
    },
    {
      name: "인기상품",
      path: "/HotProduct",
    },
    {
      name: "최신상품",
      path: "/LatestProduct",
    },
    {
      name: "신상품",
      path: "/NewProduct",
    },
    {
      name: "중고상품",
      path: "/UsedProduct",
    },
    {
      name: "공지사항",
      path: "/Notification",
    },
    {
      path: "/Mypage",
      icon: <FontAwesomeIcon icon={faUser} style={{color: "#000000"}} />,
    },
    {
      path: "/Cart",
      icon:<FontAwesomeIcon icon={faBagShopping} style={{color: "#000000"}} />,
    },
    {
      path: "/Dibs",
      icon: <FontAwesomeIcon icon={faHeart} style={{color: "#000000"}} />,
    },
    {
      name: "주문/배송",
      path: "/OrderDelivery",
    },
    {
      name: "Q&A",
      path: "/Inquiry",
    }
  ]
  return <div className="Header">
    <div className="Content">
      <Link to="/ShoppingMall"  style={{ textDecoration: "none"}}>GGD'S</Link>
      <Link to ="/Idlecup"> <img src={logo}></img> </Link>
      <div className="Category">
      <FontAwesomeIcon icon={faList} />
      
      </div>
      
        <div className="Title">
          <Link to= "/HotProduct"  style={{ textDecoration: "none"}}>인기상품</Link>&nbsp;
          <p className='Menu'>높은 가격순</p>
          <p className='Menu'>낮은 가격순</p>
          <p className='Menu'>별점 순</p>
        </div>
        <div className="Title">
          <Link to= "/LatestProduct"  style={{ textDecoration: "none"}}>최신상품</Link>&nbsp;
          <p className='Menu'>높은 가격순</p>
          <p className='Menu'>낮은 가격순</p>
          <p className='Menu'>별점 순</p>
        </div>
        <div className="Title">
          <Link to= "/NewProduct"  style={{ textDecoration: "none"}}>신상품</Link>&nbsp;
          <p className='Menu'>등록일순</p>
          <p className='Menu'>높은 가격순</p>
          <p className='Menu'>낮은 가격순</p>
          <p className='Menu'>인기순</p>
        </div>
        <div className="Title">
          <Link to= "/UsedProduct"  style={{ textDecoration: "none"}}>중고상품</Link>&nbsp; 
          <p className='Menu'>등록일순</p>
          <p className='Menu'>높은 가격순</p>
          <p className='Menu'>낮은 가격순</p>
          <p className='Menu'>인기순</p>
        </div>
        <div className="Title">
          <Link to= "/Notification"  style={{ textDecoration: "none"}}>공지사항</Link>&nbsp; 
        </div>
      
      <div className="Search">
        <input type="text" placeholder="검색"/><FontAwesomeIcon icon={faMagnifyingGlass} />&nbsp;
      </div>
      <div className="Item">
        <Link to= "/Mypage"><FontAwesomeIcon icon={faUser} style={{color: "#000000", textDecoration: "none"}} /></Link>&nbsp;
        <Link to= "/Cart"><FontAwesomeIcon icon={faBagShopping} style={{color: "#000000",  textDecoration: "none"}} /></Link>&nbsp;
        <Link to= "/Dibs"><FontAwesomeIcon icon={faHeart} style={{color: "#000000",  textDecoration: "none"}} /></Link>&nbsp;
        <Link to= "/Login" style={{ textDecoration: "none"}}>로그인</Link>&nbsp; 
        <Link to= "/JoinChoice" style={{ textDecoration: "none"}}>회원가입</Link>&nbsp; 
        <Link to= "/OrderDelivery" style={{ textDecoration: "none"}}>주문/배송</Link>&nbsp; 
        <Link to= "/Inquiry" style={{ textDecoration: "none"}}>Q&A</Link>&nbsp; 
      </div>
    </div>
  </div>;
};
export default Header;
