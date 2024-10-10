import React from "react";
import Slideshow from "./Slideshow";
import InfiniteScroll from "./InfiniteScroll";
import "./scss/ShoppingMall.scss"
import { Link, Outlet } from "react-router-dom";

const ShoppingMall = () => {
  return (
    <div>
      <Slideshow />
      <div className="body">
      <InfiniteScroll />
      </div>
    </div>
  );
};

export default ShoppingMall;
