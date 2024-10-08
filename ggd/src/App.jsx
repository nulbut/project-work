import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import ShoppingMall from "./components/shop/ShoppingMall";
import ShopLayout from "./components/shop/ShopLayout";
import UsedProduct from "./components/shop/UsedProduct";
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
import IdealcupMain from "./components/idealcup/IdealcupMain";
import Game from "./components/idealcup/Game";
import IdealcupLayout from "./components/idealcup/IdealcupLayout";
import IdealCupMaker from "./components/idealcup/IdealcupMaker";
function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ShopLayout />}>
          <Route path="/shoppingmall" element={<ShoppingMall />} />
          <Route path="/hotProduct" element={<HotProduct />} />
          <Route path="/latestProduct" element={<LatestProducts />} />
          <Route path="/newProduct" element={<NewProduct />} />
          <Route path="/usedProduct" element={<UsedProduct />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dibs" element={<Dibs />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/join" element={<Join/>} />
          <Route path="/orderDelivery" element={<OrderDelivery/>} />
          <Route path="/inquiry" element={<Inquiry/>} />

          <Route path="/joinchoice" element={<JoinChoice />} />
        </Route>
        <Route element={<IdealcupLayout />}>
          <Route path="/idlecup" element={<IdealcupMain />} />
          <Route path="/game" element={<Game />} />
          <Route path="/make" element={<IdealCupMaker />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
