import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faFilePen,
  faHouseUser,
  faFlagCheckered,
  faChartSimple,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import "./scss/IdealcupSidebar.scss";
import { icon } from "@fortawesome/fontawesome-svg-core";
const IdealcupSidebar = () => {
  const menus = [
    {
      name: "이상형\n월드컵",
      path: "/",
      icon: <FontAwesomeIcon icon={faTrophy} />,
    },
    {
      name: "월드컵\n만들기",
      path: "/make",
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
      path: "/",
      icon: <FontAwesomeIcon icon={faCommentDots} />,
    },
  ];
  return (
    <div className="sidebar">
      {menus.map((menu, index) => {
        return (
          <Link className="sidebar-menu" to={menu.path} key={index}>
            <div className="side-icon">{menu.icon}</div>
            {menu.name}
          </Link>
        );
      })}
    </div>
  );
};

export default IdealcupSidebar;
