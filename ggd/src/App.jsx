import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Idlecup from "./components/Idlecup";
import ShoppingMall from "./components/ShoppingMall";
import ShopLayout from "./components/ShopLayout";
import Hot from "./components/Hot";
import Used from "./components/Used";

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
        <Route path="/idlecup" element={<Idlecup />} />
      </Routes>
    </div>
  );
}

export default App;
