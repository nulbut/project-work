import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Slider from "./Slider"

const ShopLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Slider />
      <Footer />
    </div>
  );
};

export default ShopLayout;