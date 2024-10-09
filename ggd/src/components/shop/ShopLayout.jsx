import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ShopSideber from "./ShopSideber";


const ShopLayout = () => {
  return (
    <div>
      <Header />
      <ShopSideber />
      <Outlet />
      <Footer />
    </div>
  );
};

export default ShopLayout;