import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faFilePen,
  faHouseUser,
  faFlagCheckered,
  faChartSimple,
  faCommentDots,
  faHeart,
  faPlus,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import "./scss/IdealcupSidebar.scss";
const IdealcupSidebar = () => {
  let menus = [];
  if (sessionStorage.getItem("nid") == null) {
    menus = [
      {
        name: "이상형\n월드컵",
        path: "/idlecup",
        icon: <FontAwesomeIcon icon={faTrophy} />,
      },
      {
        name: "통계",
        path: "/cupstatics",
        icon: <FontAwesomeIcon icon={faChartSimple} />,
      },
      {
        name: "굿즈샵",
        path: "/ShoppingMall",
        icon: <FontAwesomeIcon icon={faShop} />,
      },
      {
        name: "더 많은 기능",
        path: "/login",

        icon: <FontAwesomeIcon icon={faPlus} />,
      },
    ];
  } else {
    menus = [
      {
        name: "이상형\n월드컵",
        path: "/idlecup",
        icon: <FontAwesomeIcon icon={faTrophy} />,
      },
      {
        name: "추천한\n월드컵",
        path: "/iealecuplike",
        icon: <FontAwesomeIcon icon={faHeart} />,
      },
      {
        name: "월드컵\n만들기",
        path: "/make",
        icon: <FontAwesomeIcon icon={faFilePen} />,
      },
      {
        name: "나의\n월드컵",
        path: "/mycup",
        icon: <FontAwesomeIcon icon={faHouseUser} />,
      },
      // {
      //   name: "이어하기",
      //   path: "/",
      //   icon: <FontAwesomeIcon icon={faFlagCheckered} />,
      // },

      {
        name: "통계",
        path: "/cupstatics",
        icon: <FontAwesomeIcon icon={faChartSimple} />,
      },
      {
        name: "굿즈샵",
        path: "/ShoppingMall",
        icon: <FontAwesomeIcon icon={faShop} />,
      },
      {
        name: "문의",
        path: "/idleinquiry",
        icon: <FontAwesomeIcon icon={faCommentDots} />,
      },
    ];
  }
  return (
    <div className="sidebar">
      {menus.map((menu, index) => {
        return (
          <NavLink
            className="sidebar-menu"
            to={menu.path}
            key={index}
            state={{ where: "ideal" }}
            activeclassname="active"
          >
            <div className="side-icon">{menu.icon}</div>
            {menu.name}
          </NavLink>
        );
      })}
    </div>
  );
};

export default IdealcupSidebar;
