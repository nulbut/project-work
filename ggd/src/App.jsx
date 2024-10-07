import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import IdlecupMain from "./components/idlecup/IdlecupMain";
import ShoppingMall from "./components/shop/ShoppingMall";
import ShopLayout from "./components/shop/ShopLayout";

import Used_Product from "./components/shop/Used_Product";
import Game from "./components/idlecup/Game";
import IdlecupLayout from "./components/idlecup/IdlecupLayout";
import Latest_Products from "./components/shop/Latest_Products";
import Hot_Product from "./components/shop/Hot_Product";
import New_Product from "./components/shop/New_Product";
import Notification from "./components/shop/Notification";
import Mypage from "./components/shop/Mypage";
import Cart from "./components/shop/Cart";
import Dibs from "./components/shop/Dibs";
import Login from "./components/shop/Login";
import OrderDelivery from "./components/shop/OrderDelivery";
import Inquiry from "./components/shop/Inquiry";
import JoinChoice from "./components/shop/JoinChoice";
import JoinN from "./components/shop/JoinN";

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ShopLayout />}>
          <Route path="/shoppingmall" element={<ShoppingMall />} />
          <Route path="/hot_Product" element={<Hot_Product />} />
          <Route path="/latest_Product" element={<Latest_Products/>} />
          <Route path="/new_Product" element={<New_Product />} />
          <Route path="/used_Product" element={<Used_Product />} />
          <Route path="/notification" element={<Notification/>} />
          <Route path="/mypage" element={<Mypage/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/dibs" element={<Dibs />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/joinchoice" element={<JoinChoice/>} />
          <Route path="/join_n" element={<JoinN />} />
          <Route path="/orderDelivery" element={<OrderDelivery/>} />
          <Route path="/inquiry" element={<Inquiry/>} />
        </Route>
        <Route element={<IdlecupLayout />}>
          <Route path="/idlecup" element={<IdlecupMain />} />
          <Route path="/game" element={<Game />} />
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
