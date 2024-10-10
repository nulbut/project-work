import React from "react";
import Slideshow from "./Slideshow";
import InfiniteScroll from "./InfiniteScroll";

import { Link, Outlet } from "react-router-dom";

const ShoppingMall = () => {
  return (
    <div>
      <Slideshow />
      <InfiniteScroll />
    </div>
  );
};

export default ShoppingMall;
