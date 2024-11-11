import React, { useCallback, useEffect, useState } from "react";
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
import IdealCupLike from "./components/idealcup/IdealcupLike";
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
import BMypage from "./components/shop/BMypage";
import BproductRegisterd from "./components/shop/BproductRegisterd";
import BproductWirte from "./components/shop/BproductWirte";
import AdminLogin from "./components/admin/AdminLogin";
import ProductUpdate from "./components/shop/ProductUpdate";
import UsedWrite from "./components/shop/UsedWrite";
import ProductDetails from "./components/shop/ProductDetails";
import UsedRegistered from "./components/shop/UsedRegistered";
import UsedView from "./components/shop/UsedView";
import ProductPurchase from "./components/shop/ProductPurchase";
import { WidgetCheckoutPage } from "./components/toss/widget/WidgetCheckout";
import { WidgetSuccessPage } from "./components/toss/widget/WidgetSuccess";
import { PaymentCheckoutPage } from "./components/toss/payment/PaymentCheckout";
import { PaymentSuccessPage } from "./components/toss/payment/PaymentSuccess";
import { FailPage } from "./components/toss/fail";
import { BrandpayCheckoutPage } from "./components/toss/brandpay/BrandpayCheckout";
import { BrandpaySuccessPage } from "./components/toss/brandpay/BrandpaySuccess";
// import { PaymentBillingPage } from "./components/toss/payment/PaymentBilling";
import InquiryForm from "./components/idealcup/InquiryForm";
import BproductUpdata from "./components/shop/BproductUpdata";
import BMypageView from "./components/shop/BMypageView";
import BproductView from "./components/shop/BproductView";
import BMemberView from "./components/shop/BMemberView";
import BMemberPasswordCheck from "./components/shop/BMemberPasswordCheck";
import BMemberUpdate from "./components/shop/BMemberUpdate";
import BProductStock from "./components/shop/BProductStock";
import BInquiry from "./components/shop/BInquiry";
import BOderHistory from "./components/shop/BOderHistory";
import ResultPage from "./components/idealcup/ResultPage";
import NmemberUpdate from "./components/shop/NmemberUpdate";
import NmemberPasswordCheck from "./components/shop/NmemberPasswordCheck";
import NMemberView from "./components/shop/NMemberView";
import MemberSecession from "./components/shop/MemberSecession";

function App() {
  const nav = useNavigate();

  //로그인 상태 저장

  const [loginState, setLoginState] = useState({
    loginid: "",
    loginnick: "",
    mlink: "/login",
  }); //로그인 전 상태`

  //로그아웃 함수
  const onLogout = () => {
    alert("로그아웃 되었습니다.");
    // console.log("뭐냐이건?");
    const newState = {
      loginid: "",
      loginnick: "",
      mlink: "/login",
    };
    setLoginState(newState);

    //로그아웃 후 로그인 상태정보 삭제
    sessionStorage.removeItem("nid");
    sessionStorage.removeItem("bid");
    sessionStorage.removeItem("nnickname");

    //첫페이지로 이동
    nav("/", { replace: true });
  };

  //세션에 저장된 로그인 정보를 가져옴 (로그인 상태 유지)
  useEffect(() => {
    const nid = sessionStorage.getItem("nid");
    const bid = sessionStorage.getItem("bid");
    //console.log(nid, bid);
    const nick = sessionStorage.getItem("nnickname");
    if (nid !== null) {
      //로그인 상태
      const newState = {
        loginid: nid,
        loginnick: nick,

        mlink: "/mypage",
      };
      setLoginState(newState);
    }

    if (bid !== null) {
      const newState = {
        loginid: bid,
        loginnick: nick,
        mlink: "bp0",
      };
      setLoginState(newState);
    }
  }, []);

  //로그인 성공 시 로그인 상태 변경 함수
  const sucLogin = useCallback((nid, nick, cate) => {
    let link = "";
    if (cate == "n") {
      link = "/mypage";
    } else {
      link = "bp0";
    }
    const newState = {
      loginid: nid,
      loginnick: nick,
      mlink: link,
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
          <Route path="/changepass" element={<ChangePass />} />
          <Route path="/joinchoice" element={<JoinChoice />} />
          <Route path="/join_n" element={<JoinN />} />
          <Route path="/join_b" element={<JoinB />} />

          <Route path="/mypage" element={<Mypage onLogout={onLogout} />}>
            <Route path="orderDelivery" element={<OrderDelivery />} />
            {/* <Route
              path="nmemberpasswordcheck"
              element={<NmemberPasswordCheck />}
            /> */}

            <Route path="productRegistered" element={<ProductRegistered />} />
            <Route path="productWrite" element={<ProductWrite />} />
            <Route path="dibs" element={<Dibs />} />
            <Route path="inquiry" element={<Inquiry />} />
            <Route path="inquiryWrite" element={<InquiryWrite />} />
            <Route path="inquiry/inView" element={<InquiryView />} />
            <Route path="inquiry/inView/inUpdate" element={<InquiryUpdate />} />
            <Route path="PasswordChek" element={<NmemberPasswordCheck />} />
            <Route path="PasswordChek/NMview" element={<NMemberView />} />
            <Route
              path="PasswordChek/NMview/NmUpdate"
              element={<NmemberUpdate />}
            />
            <Route path="productRegistered/pdView" element={<ProductView />} />
            <Route
              path="productRegistered/pdview/pdUpdate"
              element={<ProductUpdate />}
            />
            <Route path="usedRegistered" element={<UsedRegistered />} />
            <Route path="usedRegistered/usView" element={<UsedView />} />
          </Route>

          <Route path="usedWrite" element={<UsedWrite />} />

          <Route path="bmypage" element={<BMypage onLogout={onLogout} />}>
            <Route path="bp1" element={<BproductRegisterd />} />
            {/* <Route path="widget/widsuccess" element={<WidgetSuccessPage />} /> */}

            <Route path="bproductstock" element={<BProductStock />} />
            <Route path="binquiry" element={<BInquiry />} />
            <Route path="boderhistory" element={<BOderHistory />} />
          </Route>
          <Route path="bp0" element={<BMypageView onLogout={onLogout} />} />

          <Route path="/bproductw" element={<BproductWirte />} />
          <Route path="/pddetails?" element={<ProductDetails />} />
          <Route path="/pdpurchase" element={<ProductPurchase />} />
          <Route path="/widsuccess" element={<WidgetSuccessPage />} />
          <Route path="/widgetcheckout" element={<WidgetCheckoutPage />} />
          <Route path="/fail" element={<FailPage />} />
          <Route path="/payment" element={<PaymentCheckoutPage />} />
          <Route path="/pmsuccess" element={<PaymentSuccessPage />} />
          <Route path="/bpcheckout" element={<BrandpayCheckoutPage />} />
          <Route path="/bpsuccess" element={<BrandpaySuccessPage />} />
          <Route path="/bproductview" element={<BproductView />} />
          <Route path="/bproductupdata" element={<BproductUpdata />} />
          <Route path="/bmemberview" element={<BMemberView />} />

          <Route
            path="/bmemberpasswordcheck"
            element={<BMemberPasswordCheck />}
          />
          <Route path="/bmemberupdate" element={<BMemberUpdate />} />
          <Route path="/membersecession" element={<MemberSecession />} />
        </Route>

        <Route
          element={<IdealcupLayout lstate={loginState} onLogout={onLogout} />}
        >
          <Route path="/idlecup" element={<IdealcupMain />} />
          <Route path="/iealecuplike" element={<IdealCupLike />} />
          <Route path="/game?" element={<Game />} />
          <Route path="/make" element={<IdealCupMaker />} />
          <Route path="/mycup" element={<IdealcupMy />} />
          <Route path="/idleinquiry" element={<InquiryForm />} />
          <Route path="/resultpage" element={<ResultPage />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminex" element={<AdminEx />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}

export default App;
