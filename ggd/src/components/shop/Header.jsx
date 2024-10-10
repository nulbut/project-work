import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faMagnifyingGlass, faUser,faBagShopping,faHeart} from "@fortawesome/free-solid-svg-icons";
import "./scss/Header.scss";




const Header = () => {
  const menus = [//메뉴
    {
      name: "GGD'S" ,
      path: "ShoppingMall",
      sub: 0,
    },
    {
      path: "/Idlecup",
      icon: <img src={logo}  />,
      sub: 0,
    },
    {
      path: "",
      icon:<FontAwesomeIcon icon={faList} />,
      sub: 0,
    },
    {
      name: "인기상품",
      path: "/HotProduct",
      sub: 1,
    },
    {
      name: "최신상품",
      path: "/LatestProduct",
      sub: 1,
    },
    {
      name: "신상품",
      path: "/NewProduct",
      sub: 2,
    },
    {
      name: "중고상품",
      path: "/UsedProduct",
      sub: 2,
    },
    {
      name: "공지사항",
      path: "/Notification",
      sub: 0,
    }, 
  ]

  const submenus = [ //서브메뉴
    {
      path: "",
      name: "높은가격",
    },
    {
      path: "",
      name: "낮은가격",
    },
    {
      path: "",
      name: "인기순",
    }
  ]

  const menus2 =[ // 아이콘/메뉴2
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
          menu.sub == 0  ? (
            <Link
              className="Content"
              to={menu.path}
              key={index}
            >
              <div className="Icon">{menu.icon}</div>
              {menu.name}
            </Link>
          ) : (
            <div
                className="Content-sub"
                to={menu.path}
                key={index}
              >
                <div>
                  {menu.name}
                  <div>
                    {submenus.map((sub, idx) => {
                      return (<Link
                        className="Sub"
                        to={sub.path}
                        key={idx}
                      >
                        {sub.name}
                      </Link>);
                    })}
                  </div> 
                </div>
              </div>
            
          )
        )
      })}
      <div className="input">
        <input type="text" placeholder="검색"/>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
      
      <div className="">
        {menus2.map((menu2, index2) =>{
          return(
            <Link 
            className="Content2"
            to={menu2.path}
            key={index2}
          >
            <div className="Icon2">{menu2.icon}</div>
            {menu2.name}
          </Link>
          )
        })}
      </div>
    </div>

  );
};
export default Header;
