import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo3.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faMagnifyingGlass,
  faUser,
  faBagShopping,
  faHeart,
  faHandshakeSimple,
} from "@fortawesome/free-solid-svg-icons";
import "./scss/Header.scss";

const Header = ({ lstate, onLogout }) => {
  const { loginid, mlink, loginnick } = lstate;

  //console.log(loginnick);
  // const [categoryitem, setCategoryitem] = useState([]);//빈 객체로 초기화
  const menus = [
    //메뉴
    {
      name: (
        <div className="logo">
          <h2>
            GooseGoodsDuck's <img src={logo} />
          </h2>
        </div>
      ),
      path: "ShoppingMall",
      sub: 0,
    },

    // {
    //   name: "인기상품",
    //   path: "/HotProduct",
    //   sub: 1,
    // },
    // {
    //   name: "최신상품",
    //   path: "/LatestProduct",
    //   sub: 1,
    // },
    {
      name: "입점상품",
      path: "/storeProduct",
      sub: 1,
    },
    {
      name: "중고상품",
      path: "/UsedProduct",
      sub: 1,
    },
  ];

  const submenus = [
    // //서브메뉴
    // {
    //   path: "",
    //   name: "높은가격",
    // },
    // {
    //   path: "",
    //   name: "낮은가격",
    // },
    // {
    //   path: "",
    //   name: "인기순",
    // },
  ];
  const submenus2 = [
    {
      name: "주문/배송",
      path: "/mypage/orderDelivery",
    },
    {
      name: "공지사항",
      path: "/Notification",
      sub: 0,
    },
    {
      name: "Q&A",
      path: "/mypage/Inquiry",
    },
  ];
  const menus2 = [
    // 아이콘/메뉴2
    {
      name: (
        <div className="logintab">
          <Link to={mlink}>{loginid !== "" ? `${loginnick}님` : "로그인"}</Link>
          {loginid !== "" ? (
            <span className="Sub" onClick={onLogout}>
              로그아웃
            </span>
          ) : (
            <Link className="Sub" to={"/joinchoice"}>
              회원가입
            </Link>
          )}
        </div>
      ),
    },

    {
      name: (
        <div className="myPage">
          <i>
            <FontAwesomeIcon icon={faUser} style={{ color: "#000000" }} />
          </i>
          <div className="abc">
            {submenus2.map((menu2, index2) => {
              return (
                <Link to={menu2.path} key={index2}>
                  <div className="Sub">{menu2.name}</div>
                </Link>
              );
            })}
          </div>
        </div>
      ),
      path: "/mypage",
      //경로가 mypage라서 사업자의 경우 일반 회원 mypage로 들어가버림 해결필요
    },
    // {
    //   path: "/",
    //   icon: <FontAwesomeIcon icon={faList} />,
    //   sub: 2,
    // },
    {
      path: "/Cart",
      icon: (
        <FontAwesomeIcon icon={faBagShopping} style={{ color: "#000000" }} />
      ),
    },
    {
      path: "/mypage/dibs",
      icon: <FontAwesomeIcon icon={faHeart} style={{ color: "#000000" }} />,
    },
    {
      path: "usedWrite",
      icon: (
        <FontAwesomeIcon
          icon={faHandshakeSimple}
          style={{ color: "#000000" }}
        />
      ),
    },
    // {
    //   name: "주문/배송",
    //   path: "/mypage/orderDelivery",
    // },
    // {
    //   name: "공지사항",
    //   path: "/Notification",
    //   sub: 0,
    // },
    // {
    //   name: "Q&A",
    //   path: "/Inquiry",
    // },

    // {
    //   name: "Q&A",
    //   path: "/Inquiry",
    // },
  ];

  const Categotry = [
    {
      name: "영화/드라마",
      path: "",
    },
    {
      name: "게임",
      path: "",
    },
    {
      name: "연예인",
      path: "",
    },
    {
      name: "애니메이션",
      path: "",
    },
    {
      name: "스포츠",
      path: "",
    },
    {
      name: "기타",
      path: "",
    },
  ];

  return (
    <div className="Header">
      <div>
        {menus.map((menu, index) => {
          return menu.sub == 0 ? (
            <Link className="Content" to={menu.path} key={index}>
              {menu.icon}
              {menu.name}
            </Link>
          ) : menu.sub == 2 ? (
            <Link className="Content-sub" to={menu.path} key={index}>
              <div className="Icon">{menu.icon}</div>
              <div>
                {Categotry.map((sub2, idx2) => {
                  return (
                    <Link className="Sub" to={sub2.path} key={idx2}>
                      {sub2.name}
                    </Link>
                  );
                })}
              </div>
            </Link>
          ) : (
            <Link className="Content-sub" to={menu.path} key={index}>
              <div>
                {menu.name}
                {submenus.map((sub, idx) => {
                  return (
                    <Link className="Sub" to={sub.path} key={idx}>
                      {sub.name}
                    </Link>
                  );
                })}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="rightHeader">
        <div className="input">
          {/* <input 
          type="text" placeholder="검색"/> */}
          <div className="button-header-icon">
            <i>{/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}</i>
          </div>
        </div>

        <div className="rightContent">
          {menus2.map((menu2, index2) => {
            return (
              <Link className="Content2" to={menu2.path} key={index2}>
                <div className="Icon2">{menu2.icon}</div>
                {menu2.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Header;
