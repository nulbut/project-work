import {
  loadTossPayments,
  ANONYMOUS,
  PaymentWidgetInstance,
} from "@tosspayments/tosspayments-sdk";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// TODO: clientKey는 개발자센터의 결제위젯 연동 키 > 클라이언트 키로 바꾸세요.
// TODO: server.js 의 secretKey 또한 결제위젯 연동 키가 아닌 API 개별 연동 키의 시크릿 키로 변경해야 합니다.
// TODO: 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요. 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = generateRandomString();
const sampeid = generateRandomString();
console.log(sampeid);
export function WidgetCheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [productData, setProductData] = useState([location.state?.data]);
  console.log(productData);
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: productData.usedSeller,
  });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      try {
        const tossPayments = await loadTossPayments(clientKey);

        // 회원 결제
        // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentswidgets
        const widgets = tossPayments.widgets({
          customerKey,
        });
        // 비회원 결제
        // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

        setWidgets(widgets);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    }

    fetchPaymentWidgets();
  }, [clientKey, customerKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }

      // ------  주문서의 결제 금액 설정 ------
      // TODO: 위젯의 결제금액을 결제하려는 금액으로 초기화하세요.
      // TODO: renderPaymentMethods, renderAgreement, requestPayment 보다 반드시 선행되어야 합니다.
      // @docs https://docs.tosspayments.com/sdk/v2/js#widgetssetamount
      await widgets.setAmount(amount);

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        // @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrenderpaymentmethods
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          // 렌더링하고 싶은 결제 UI의 variantKey
          // 결제 수단 및 스타일이 다른 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
          // @docs https://docs.tosspayments.com/guides/v2/payment-widget/admin#새로운-결제-ui-추가하기
          variantKey: "DEFAULT",
        }),
        // ------  이용약관 UI 렌더링 ------
        // @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrenderagreement
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // 서버에서 장바구니 데이터 가져오기
  useEffect(() => {
    axios
      .get("/api/cart")
      .then((response) => {
        setCartItems(response.data);
        calculateTotalPrice(response.data);
      })
      .catch((error) => {
        console.error("장바구니 데이터를 가져오는 데 실패했습니다:", error);
      });
  }, []);

  // 총 금액 계산
  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  // 수량 변경 핸들러
  const handleQuantityChange = (id, newQuantity) => {
    const updatedItems = productData.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    calculateTotalPrice(updatedItems);
  };

  // 결제 페이지로 이동
  const handleCheckout = () => {
    // 장바구니 데이터 전송 (POST)
    axios
      .post("/api/checkout", { items: cartItems })
      .then((response) => {
        window.location.href = "/checkout"; // 결제 페이지로 리다이렉션
      })
      .catch((error) => {
        console.error("결제 처리 중 오류가 발생했습니다:", error);
      });
  };
  return (
    <div className="wrapper">
      <div>
        <h1>구매 예정 목록</h1>
        {productData.length > 0 ? (
          <div>
            {productData.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={`usupload/${item.usedproductFileTblList[0].usedFileSysname}`}
                  alt={item.usedName}
                  width="100"
                />
                <div>{item.usedName}</div>
                <div>가격: {item.usedSeller} 원</div>
                <div>
                  수량:
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                  />
                </div>
                <div>합계: {item.price * item.quantity} 원</div>
              </div>
            ))}
            <div>
              <h2>총 금액: {totalPrice} 원</h2>
            </div>
            <button onClick={handleCheckout}>결제하기</button>
          </div>
        ) : (
          <p>장바구니가 비었습니다.</p>
        )}
      </div>
      <div className="box_section">
        {/* 결제 UI */}
        <div id="payment-method" />
        {/* 이용약관 UI */}
        <div id="agreement" />
        {/* 쿠폰 체크박스 */}
        <div style={{ paddingLeft: "30px" }}>
          <div className="checkable typography--p">
            <label
              htmlFor="coupon-box"
              className="checkable__label typography--regular"
            >
              <input
                id="coupon-box"
                className="checkable__input"
                type="checkbox"
                aria-checked="true"
                disabled={!ready}
                // ------  주문서의 결제 금액이 변경되었을 경우 결제 금액 업데이트 ------
                // @docs https://docs.tosspayments.com/sdk/v2/js#widgetssetamount
                onChange={async (event) => {
                  if (event.target.checked) {
                    await widgets.setAmount({
                      currency: amount.currency,
                      value: amount.value - 5000,
                    });

                    return;
                  }

                  await widgets.setAmount({
                    currency: amount.currency,
                    value: amount.value,
                  });
                }}
              />
              <span className="checkable__label-text">5,000원 쿠폰 적용</span>
            </label>
          </div>
        </div>

        {/* 결제하기 버튼 */}
        <button
          className="button"
          style={{ marginTop: "30px" }}
          disabled={!ready}
          // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
          // @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrequestpayment
          onClick={async () => {
            try {
              // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
              // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
              await widgets.requestPayment({
                orderId: sampeid, // 고유 주문 번호
                orderName: "토스 티셔츠 외 2건",
                successUrl: window.location.origin + "/widsuccess", // 결제 요청이 성공하면 리다이렉트되는 URL
                failUrl: window.location.origin + "/fail", // 결제 요청이 실패하면 리다이렉트되는 URL
                customerEmail: "customer123@gmail.com",
                customerName: "김토스",
                customerMobilePhone: "01012341234",
              });
            } catch (error) {
              // 에러 처리하기
              console.error(error);
            }
          }}
        >
          결제하기
        </button>
      </div>
      <div
        className="box_section"
        style={{
          padding: "40px 30px 50px 30px",
          marginTop: "30px",
          marginBottom: "50px",
        }}
      >
        <button
          className="button"
          style={{ marginTop: "30px" }}
          onClick={() => {
            navigate("/brandpay/checkout");
          }}
        >
          위젯 없이 브랜드페이만 연동하기
        </button>
        <button
          className="button"
          style={{ marginTop: "30px" }}
          onClick={() => {
            navigate("/payment/checkout");
          }}
        >
          위젯 없이 결제창만 연동하기
        </button>
      </div>
    </div>
  );
}

function generateRandomString() {
  return window.btoa(Math.random().toString()).slice(0, 20);
}
