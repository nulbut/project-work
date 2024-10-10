import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faMagnifyingGlass, faUser,faBagShopping,faHeart} from "@fortawesome/free-solid-svg-icons";
import "./scss/Header.scss";
import Button from "../idealcup/Button";



const Header = () => {
  const menus = [
    {
      name: "GGD'S",
      path: "ShoppingMall",
    },
    {
      path: "/Idlecup",
      icon: <img src={logo} style={{}} />
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
      name: "로그인",
      path: "/Login"
    },
    {
      name: "회원가입",
      path: "/JoinChoice",
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
  return( 
    <div className="Header">
      {menus.map((menu, index) =>{
        return (
          <Link
            className="Content"
            to={menu.path}
            key={index}
          >
            <div className="">{menu.icon}</div>
            {menu.name}
          </Link>
        )
      })}
      <input type="text" placeholder="검색"></input>
    </div>
  );
};
export default Header;
