import {
  loadTossPayments,
  ANONYMOUS,
  PaymentWidgetInstance,
} from "@tosspayments/tosspayments-sdk";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./WidgetCheckout.scss";

// TODO: clientKey는 개발자센터의 결제위젯 연동 키 > 클라이언트 키로 바꾸세요.
// TODO: server.js 의 secretKey 또한 결제위젯 연동 키가 아닌 API 개별 연동 키의 시크릿 키로 변경해야 합니다.
// TODO: 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요. 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = generateRandomString();

export function WidgetCheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [productData, setProductData] = useState([]);
  //카트에서 여러개의 리스트로 넘어올 경우
  const [buyData, setBuyData] = useState([
    {
      //초기화
      img: "",
      name: "기본 값",
      price: 1,
      quantity: 1,
      where: "중고",
      product_code: "",
    },
  ]);
  console.log(productData);

  console.log(buyData);
  const [totalPrice, setTotalPrice] = useState(0);
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: 0,
  });
  console.log("datas가 있음", location.state.datas);
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);

  useEffect(() => {
    // location.state?.data와 location.state?.datas가 각각 어떤 데이터 구조인지 확인하고 처리
    if (location.state?.data) {
      console.log("data가 있음", location.state.data);
      const data = location.state.data;
      if ("bpnum" in data) {
        console.log("하이요");
        if (data.bproductFileTblList && data.bproductFileTblList.length > 0) {
          setBuyData([
            {
              img: `productupload/${data.bproductFileTblList[0].bproductfilesysname}`,
              name: data.bpname,
              price: data.bpprice,
              quantity: 1,
              product_where: "입점",
              product_code: data.bpnum,
              seller_id: data.bprobid,
            },
          ]);
          calculateTotalPrice([
            {
              img: `productupload/${data.bproductFileTblList[0].bproductfilesysname}`,
              name: data.bpname,
              price: data.bpprice,
              quantity: 1,
              product_where: "입점",
              product_code: data.bpnum,
            },
          ]);
        }
      } else {
        if (
          data.usedproductFileTblList &&
          data.usedproductFileTblList.length > 0
        ) {
          setBuyData([
            {
              img: `usupload/${data.usedproductFileTblList[0]?.usedFileSysname}`,
              name: data.usedName,
              price: data.usedSeller,
              quantity: 1,
              product_where: "중고",
              product_code: data.usedCode,
              seller_id: data.usedsellerId,
            },
          ]);
          calculateTotalPrice([
            {
              img: `usupload/${data.usedproductFileTblList[0]?.usedFileSysname}`,
              name: data.usedName,
              price: data.usedSeller,
              quantity: 1,
              product_where: "중고",
              product_code: data.usedCode,
            },
          ]);
        }
      }
    }

    if (location.state?.datas) {
      console.log("datas가 있음", location.state.datas);
      const datas = location.state.datas;

      setBuyData(datas);

      calculateTotalPrice(datas);
    }
  }, [location.state]);
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
  }, [widgets, amount]);

  // 총 금액 계산
  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);

    setAmount({
      currency: "KRW",
      value: total,
    });
  };

  // 수량 변경 핸들러
  const handleQuantityChange = (idx, newQuantity) => {
    const updatedItems = buyData.map((item, index) =>
      index === idx ? { ...item, quantity: newQuantity } : item
    );
    console.log(updatedItems);
    setBuyData(updatedItems);
    // setProductData(updatedItems);
    calculateTotalPrice(updatedItems);
  };

  const saveOrderToServer = async (sampeid) => {
    const requestInfo = {
      buyData: buyData, // buyData 배열
      sampeid: sampeid, // sampeid 문자열
      userName: sessionStorage.getItem("nnickname"),
      userId: sessionStorage.getItem("nid"),
      totalAmount: amount.value,
      status: "pending",
    };
    try {
      // 결제 요청 전에 orderId와 amount를 서버에 저장하세요.
      // 결제 과정에서 악의적으로 결제 금액이 변경되는 것을 방지하는 용도로 사용됩니다.
      await axios
        .post("/saveorder", requestInfo)
        .then((res) => {})
        .catch((err) => console.log(err));
    } catch (error) {
      // 에러 처리하기
      console.error("결제 내역 저장 중 오류 발생:", error);
    }
  };
  const handleSubmitPay = async () => {
    const sampeid = generateRandomString();
    console.log(sampeid);
    await saveOrderToServer(sampeid);
    console.log(sessionStorage.getItem("nid"));
    try {
      // 결제 요청 전에 orderId와 amount를 서버에 저장하세요.
      // 결제 과정에서 악의적으로 결제 금액이 변경되는 것을 방지하는 용도로 사용됩니다.
      await widgets.requestPayment({
        orderId: sampeid, // 고유 주문 번호
        orderName: "토스 티셔츠 외 2건", // 주문 상품명
        successUrl: window.location.origin + "/widsuccess", // 결제 성공 시 리다이렉트될 URL
        failUrl: window.location.origin + "/fail", // 결제 실패 시 리다이렉트될 URL
        customerEmail: "customer123@gmail.com", // 고객 이메일
        customerName: sessionStorage.getItem("nnickname"), // 고객 이름
        customerMobilePhone: "01012341234", // 고객 전화번호
      });
    } catch (error) {
      // 에러 처리하기
      console.error("결제 요청 중 오류 발생:", error);
    }
  };
  console.log(amount);
  return (
    <div className="wrapper">
      <div className="purchase-list">
        <h1>구매 예정 목록</h1>

        <table className="purchase-table">
          <thead>
            <tr>
              <th>상품 이미지</th>
              <th>분류</th>
              <th>상품명</th>
              <th>가격</th>
              <th>수량</th>
              <th>합계</th>
            </tr>
          </thead>
          <tbody>
            {buyData.map((item, index) => (
              <tr key={index}>
                <td>
                  <img src={item.img} alt={item.name} width="100" />
                </td>
                <td>{item.product_where}</td>
                <td>{item.name}</td>
                <td>{item.price} 원</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value))
                    }
                  />
                </td>
                <td>{item.price * item.quantity} 원</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-price">
          <h2>총 금액: {totalPrice} 원</h2>
        </div>
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
          className="wcbutton"
          style={{ marginTop: "30px" }}
          disabled={!ready}
          // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
          // @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrequestpayment
          onClick={handleSubmitPay}
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
          className="wcbutton"
          style={{ marginTop: "30px" }}
          onClick={() => {
            navigate("/brandpay/checkout");
          }}
        >
          위젯 없이 브랜드페이만 연동하기
        </button>
        <button
          className="wcbutton"
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