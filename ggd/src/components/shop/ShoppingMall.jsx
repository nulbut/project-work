import React, { useEffect, useState } from "react";
import Slideshow from "./Slideshow";
import InfiniteScroll from "./InfiniteScroll";
import "./scss/ShoppingMall.scss"

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
