import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ShopSideber from "./ShopSideber";


const ShopLayout = (props) => {

  return (
    <div>
      <Header lstate={props.lstate} onLogout={props.onLogout} />
      <ShopSideber />
      <Outlet />
      <Footer />
    </div>
  );
};

export default ShopLayout;