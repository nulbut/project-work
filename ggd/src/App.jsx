import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import IdlecupMain from "./components/idlecup/IdlecupMain";
import ShoppingMall from "./components/shop/ShoppingMall";
import ShopLayout from "./components/shop/ShopLayout";

import UsedProduct from "./components/shop/UsedProduct";
import Game from "./components/idlecup/Game";
import IdlecupLayout from "./components/idlecup/IdlecupLayout";
import LatestProducts from "./components/shop/LatestProducts";
import HotProduct from "./components/shop/HotProduct";
import NewProduct from "./components/shop/NewProduct";
import Notification from "./components/shop/Notification";
import Mypage from "./components/shop/Mypage";
import Cart from "./components/shop/Cart";
import Dibs from "./components/shop/Dibs";
import Login from "./components/shop/Login";
import Join from "./components/shop/Join";
import OrderDelivery from "./components/shop/OrderDelivery";
import Inquiry from "./components/shop/Inquiry";
import JoinChoice from "./components/join/JoinChoice";

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ShopLayout />}>
          <Route path="/shoppingmall" element={<ShoppingMall />} />
          <Route path="/hotProduct" element={<HotProduct />} />
          <Route path="/latestProduct" element={<LatestProducts/>} />
          <Route path="/newProduct" element={<NewProduct />} />
          <Route path="/usedProduct" element={<UsedProduct />} />
          <Route path="/notification" element={<Notification/>} />
          <Route path="/mypage" element={<Mypage/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/dibs" element={<Dibs />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/join" element={<Join/>} />
          <Route path="/orderDelivery" element={<OrderDelivery/>} />
          <Route path="/inquiry" element={<Inquiry/>} />

          <Route path="/joinchoice" element={<JoinChoice />} />
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
