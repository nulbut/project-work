import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
<<<<<<< HEAD
import Idlecup from "./components/Idlecup";
import ShoppingMall from "./components/ShoppingMall";
import ShopLayout from "./components/ShopLayout";
import Hot from "./components/Hot";
import Used from "./components/Used";
import New from "./components/New";
=======
import IdlecupMain from "./components/idlecup/IdlecupMain";
import ShoppingMall from "./components/shop/ShoppingMall";
import ShopLayout from "./components/shop/ShopLayout";
import Hot from "./components/shop/Hot";
import Used from "./components/shop/Used";
import Game from "./components/idlecup/Game";
import IdlecupLayout from "./components/idlecup/IdlecupLayout";
>>>>>>> 9cdb2359a5924122103c9f80174a89ee5a19d50c

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ShopLayout />}>
          <Route path="/shoppingmall" element={<ShoppingMall />} />
          <Route path="/new" element={<New />} />
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
