import React, { useEffect, useRef, useState } from "react";
import styles from "./scss/IdlecupSidebar.scss";
const IdlecupSidebar = () => {
  const menus = [
    { name: "이상형 월드컵", path: "/" },
    { name: "월드컵 만들기", path: "/" },
    { name: "내가 만든 월드컵", path: "/" },
    { name: "이어하기", path: "/" },
    { name: "통계", path: "/" },
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
              <div menu={menu} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IdlecupSidebar;
