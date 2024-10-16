import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faMagnifyingGlass,
  faUser,
  faBagShopping,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import "./scss/Header.scss";

const Header = ({ lstate, onLogout }) => {
  const { loginid } = lstate;
  const { mlink } = lstate;

  // const [categoryitem, setCategoryitem] = useState([]);//빈 객체로 초기화
  const menus = [
    //메뉴
    {
      name: "GGD'S",
      path: "ShoppingMall",
      sub: 0,
    },
    {
      path: "/Idlecup",
      icon: <img src={logo} />,
      sub: 0,
    },
    {
      path: "/",
      icon: <FontAwesomeIcon icon={faList} />,
      sub: 2,
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
      sub: 1,
    },
    {
      name: "중고상품",
      path: "/UsedProduct",
      sub: 1,
    },
    {
      name: "공지사항",
      path: "/Notification",
      sub: 0,
    },
  ];

  const submenus = [
    //서브메뉴
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
    },
  ];

  const menus2 = [
    // 아이콘/메뉴2
    {
      path: "/mypage",
      icon: <FontAwesomeIcon icon={faUser} style={{ color: "#000000" }} />,
    },
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
    // {
    //   name: "로그인",
    //   path: "/Login",
    // },
    // {
    //   name: "회원가입",
    //   path: "/JoinChoice",
    // },
    {
      name: "주문/배송",
      path: "/mypage/orderDelivery",
    },
    {
      name: "Q&A",
      path: "/Inquiry",
    },
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

  // let Category = null;

  // if (categoryitem.length === 0) {
  //   Category = (
  //     <ShopCategoryRow key={0}>
  //       <ShopCategoryColum span={6}></ShopCategoryColum>
  //     </ShopCategoryRow>
  //   );
  // } else {
  //   Category = Object.values(categoryitem).map((item) =>(
  //     <ShopCategoryRow key={item.CategoryCode}>
  //       <ShopCategoryColum wd="w-10">{item.CategoryCode}</ShopCategoryColum>
  //       <ShopCategoryColum wd="w-10">{item.CategoryCode}</ShopCategoryColum>
  //       <ShopCategoryColum wd="w-10">{item.CategoryCode}</ShopCategoryColum>
  //       <ShopCategoryColum wd="w-10">{item.CategoryCode}</ShopCategoryColum>
  //       <ShopCategoryColum wd="w-10">{item.CategoryCode}</ShopCategoryColum>
  //       <ShopCategoryColum wd="w-10">{item.CategoryCode}</ShopCategoryColum>
  //     </ShopCategoryRow>
  //   ))
  // }

  return (
    <div className="Header">
      {menus.map((menu, index) => {
        return menu.sub == 0 ? (
          <Link className="Content" to={menu.path} key={index}>
            <div className="Icon">{menu.icon}</div>
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

      <div className="input">
        <input type="text" placeholder="검색" />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>

      <div className="">
        {menus2.map((menu2, index2) => {
          return (
            <Link className="Content2" to={menu2.path} key={index2}>
              <div className="Icon2">{menu2.icon}</div>
              {menu2.name}
            </Link>
          );
        })}
        <div>
          <div className="Content2">
            <Link to={mlink}>{loginid !== "" ? `${loginid}님` : "로그인"}</Link>
          </div>
        </div>
        <div className="Content2">
          {loginid !== "" ? (
            <span onClick={onLogout}>로그아웃</span>
          ) : (
            <Link to={"/joinchoice"}>회원가입</Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
