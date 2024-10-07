import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link, Outlet } from "react-router-dom";

const ShopLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default ShopLayout;
