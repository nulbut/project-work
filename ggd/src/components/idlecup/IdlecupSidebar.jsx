import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faFilePen,
  faHouseUser,faFlagCheckered,faChartSimple
} from "@fortawesome/free-solid-svg-icons";
import styles from "./scss/IdlecupSidebar.scss";
import { icon } from "@fortawesome/fontawesome-svg-core";
const IdlecupSidebar = () => {
  const menus = [
    {
      name: "이상형 월드컵",
      path: "/",
      icon: <FontAwesomeIcon icon={faTrophy} />,
    },
    {
      name: "월드컵 만들기",
      path: "/",
      icon: <FontAwesomeIcon icon={faFilePen} />,
    },
    {
      name: "내가 만든 월드컵",
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
    { name: "문의", path: "/" },
  ];
  return (
    <div className="sidebar">
      <div>
        {menus.map((menu, index) => {
          return (
            <div
              exact
              style={{ color: "gray", textDecoration: "none" }}
              to={menu.path}
              key={index}
              activeStyle={{ color: "black" }}
            >
              {menu.icon}
              {menu.name}
              <div menu={menu} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IdlecupSidebar;
