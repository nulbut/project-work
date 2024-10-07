import React from "react";
<<<<<<< HEAD:ggd/src/components/ShoppingMall.jsx
import Footer from "./Footer";
import Header from "./Header";
=======

>>>>>>> 9cdb2359a5924122103c9f80174a89ee5a19d50c:ggd/src/components/shop/ShoppingMall.jsx
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
