import React from "react";
import { Outlet } from "react-router-dom";
import "./scss/ProductViewLayout.scss";
import Header from "./Header";
import Footer from "./Footer";
import ShopSideber from "./ShopSideber";

const ProductViewLayout = () => {
    return (
        <div>
            <Header />
            <ShopSideber />
            <div className="body">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default ProductViewLayout;