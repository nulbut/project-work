import React from "react";

import { Link, Outlet } from "react-router-dom";

const ShoppingMall = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/new">최신</Link>
        </li>
        <li>
          <Link to="/used">중고</Link>
        </li>
        <li>
          <Link to="/hot">인기</Link>
        </li>
      </ul>
    </div>
  );
};

export default ShoppingMall;
