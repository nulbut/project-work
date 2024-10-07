import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faFilePen,
  faHouseUser,
  faFlagCheckered,
  faChartSimple,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import "./scss/IdlecupSidebar.scss";
import { icon } from "@fortawesome/fontawesome-svg-core";
const IdlecupSidebar = () => {
  const menus = [
    {
      name: "이상형\n월드컵",
      path: "/",
      icon: <FontAwesomeIcon icon={faTrophy} />,
    },
    {
      name: "월드컵\n만들기",
      path: "/",
      icon: <FontAwesomeIcon icon={faFilePen} />,
    },
    {
      name: "나의\n월드컵",
      path: "/",
      icon: <FontAwesomeIcon icon={faHouseUser} />,
    },
    {
      name: "이어하기",
      path: "/",
      icon: <FontAwesomeIcon icon={faFlagCheckered} />,
    },
    {
      name: "통계",
      path: "/",
      icon: <FontAwesomeIcon icon={faChartSimple} />,
    },
    {
      name: "문의",
      path: "/ㅇ",
      icon: <FontAwesomeIcon icon={faCommentDots} />,
    },
  ];
  return (
    <div className="sidebar">
      {menus.map((menu, index) => {
        return (
          <div
            className="sidebar-menu"
            to={menu.path}
            key={index}
            activeStyle={{ color: "black" }}
          >
            <div className="side-icon">{menu.icon}</div>
            {menu.name}
          </div>
        );
      })}
    </div>
  );
};

export default IdlecupSidebar;
