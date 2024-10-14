import React from 'react';
import Header from './Header';
import Mypage from './Mypage';
import Footer from './Footer';
import { Outlet } from "react-router-dom";
import ShopSideber from './ShopSideber';

const MypageLayout = () => {
    return (
        <div>
            <Header/>
            <ShopSideber/>
            <Mypage/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default MypageLayout;