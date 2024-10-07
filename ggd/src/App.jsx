import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Idlecup from "./components/Idlecup";
import ShoppingMall from "./components/ShoppingMall";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/idlecup" element={<Idlecup />} />
        <Route path="/shoppingmall" element={<ShoppingMall />} />
      </Routes>
    </div>
  );
}

export default App;
