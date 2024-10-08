import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

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