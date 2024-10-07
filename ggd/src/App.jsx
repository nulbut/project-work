import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import IdlecupMain from "./components/idlecup/IdlecupMain";
import ShoppingMall from "./components/shop/ShoppingMall";
import ShopLayout from "./components/shop/ShopLayout";
import Hot from "./components/shop/Hot";
import Used from "./components/shop/Used";
import Game from "./components/idlecup/Game";
import IdlecupLayout from "./components/idlecup/IdlecupLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ShopLayout />}>
          <Route path="/shoppingmall" element={<ShoppingMall />} />
          <Route path="/hot" element={<Hot />} />
          <Route path="/used" element={<Used />} />
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
