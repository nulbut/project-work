import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.scss";
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
import OrderDelivery from "./components/shop/OrderDelivery";
import Inquiry from "./components/shop/Inquiry";
import JoinChoice from "./components/shop/JoinChoice";
import IdealcupMain from "./components/idealcup/IdealcupMain";
import Game from "./components/idealcup/Game";
import IdealcupLayout from "./components/idealcup/IdealcupLayout";
import IdealCupMaker from "./components/idealcup/IdealcupMaker";
import JoinN from "./components/shop/JoinN";
import JoinB from "./components/shop/JoinB";
import IdPasswordFind from "./components/shop/IdPasswordFind";
import IdealcupMy from "./components/idealcup/IdealcupMy";
import ProductWrite from "./components/shop/ProductWrite";
import ProductRegistered from "./components/shop/ProductRegistered";
import Admin from "./components/admin/Admin";
import InquiryWrite from "./components/shop/InquiryWrite";
import InquiryView from "./components/shop/InquiryView";
import InquiryUpdate from "./components/shop/InquiryUpdate";
import ProductView from "./components/shop/ProductView";
import IdPasswordFind2 from "./components/shop/IdPasswordFind2";
import ChangePass from "./components/shop/ChangePass";
import AdminEx from "./components/admin/AdminEx";
import ProductUpdate from "./components/shop/ProductUpdate";
import UsedWrite from "./components/shop/UsedWrite";

function App() {
  const nav = useNavigate();

  //로그인 상태 저장
  const [loginState, setLoginState] = useState({  
    loginid: "",
    mlink: "/login",
  }); //로그인 전 상태

  //로그아웃 함수
  const onLogout = () => {
    alert("로그아웃 되었습니다.");
    console.log("뭐냐이건?");
    const newState = {
      loginid: "",
      mlink: "/login",
    };
    setLoginState(newState);

    //로그아웃 후 로그인 상태정보 삭제
    sessionStorage.removeItem("nid");

    //첫페이지로 이동
    nav("/", { replace: true });
  };

  //세션에 저장된 로그인 정보를 가져옴 (로그인 상태 유지)
  useEffect(() => {
    const nid = sessionStorage.getItem("nid");

    if (nid !== null) {
      //로그인 상태
      const newState = {
        loginid: nid,
        mlink: "/mypage",
      };
      setLoginState(newState);
    }
  }, []);

  //로그인 성공 시 로그인 상태 변경 함수
  const sucLogin = useCallback((nid) => {
    const newState = {
      loginid: nid,
      mlink: "/mypage",
    };
    setLoginState(newState);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ShopLayout lstate={loginState} onLogout={onLogout} />}>
          <Route path="/shoppingmall" element={<ShoppingMall />} />
          <Route path="/hotProduct" element={<HotProduct />} />
          <Route path="/latestProduct" element={<LatestProducts />} />
          <Route path="/newProduct" element={<NewProduct />} />
          <Route path="/usedProduct" element={<UsedProduct />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login sucLogin={sucLogin} />} />
          <Route path="/idpwdfind" element={<IdPasswordFind />} />
          <Route path="/idpwdfind2" element={<IdPasswordFind2 />} />
          <Route path="changepass" element={<ChangePass />} />
          <Route path="/joinchoice" element={<JoinChoice />} />
          <Route path="/join_n" element={<JoinN />} />
          <Route path="/join_b" element={<JoinB />} />
          <Route path="/mypage" element={<Mypage />}>
            <Route path="orderDelivery" element={<OrderDelivery />} />
            <Route path="productRegistered" element={<ProductRegistered />} />
            <Route path="productWrite" element={<ProductWrite />} />
            <Route path="dibs" element={<Dibs />} />
            <Route path="inquiry" element={<Inquiry sucLogin={sucLogin} />} />
            <Route path="inquiryWrite" element={<InquiryWrite />} />
            <Route path="inquiry/inView" element={<InquiryView />} />
            <Route path="inquiry/inView/inUpdate" element={<InquiryUpdate />} />
            <Route path="productRegistered/pdView" element={<ProductView />} />
            <Route path="productRegistered/pdview/pdUpdate" element={<ProductUpdate />} />
          </Route>
          <Route path="usedWrite" element={<UsedWrite />} />
        </Route>
      

        <Route
          element={<IdealcupLayout lstate={loginState} onLogout={onLogout} />}
        >
          <Route path="/idlecup" element={<IdealcupMain />} />
          <Route path="/game?" element={<Game />} />
          <Route path="/make" element={<IdealCupMaker />} />
          <Route path="/mycup" element={<IdealcupMy />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminex" element={<AdminEx />} />
      </Routes>
    </div>
  );
}

export default App;
