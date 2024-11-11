import {
  loadTossPayments,
  ANONYMOUS,
  PaymentWidgetInstance,
} from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = generateRandomString();
const sampeid = generateRandomString();
console.log(sampeid);
export function WidgetCheckoutPage() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState({
    currency: "KRW",
    value: 30000,
  });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);
  console.log(widgets);
  // 결제 데이터 가져오기 및 상태 설정
  const [paymentData, setPaymentData] = useState({
    porderId: generateRandomString(),
    pcustomerkey: generateRandomString(),
    pcustomeremail: "customer123@gmail.com",
    pcustomername: "김토스",
    pcustomerphonenum: "01012341234",
    successUrl: `${window.location.origin}/widsuccess`,
    failUrl: `${window.location.origin}/fail`,
  });

  useEffect(() => {
    async function fetchPaymentWidgets() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const widgets = tossPayments.widgets({
          customerKey: paymentData.pcustomerkey,
        });
        setWidgets(widgets);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    }

    fetchPaymentWidgets();
  }, [clientKey, paymentData.pcustomerkey]);

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
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  return (
    <div className="wrapper">
      <div className="box_section">
        <div id="payment-method" />
        <div id="agreement" />
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
                onChange={async (event) => {
                  const discount = event.target.checked ? 5000 : 0;
                  await widgets.setAmount({
                    currency: amount.currency,
                    value: amount.value - discount,
                  });
                }}
              />
              <span className="checkable__label-text">5,000원 쿠폰 적용</span>
            </label>
          </div>
        </div>

        <button
          className="button"
          style={{ marginTop: "30px" }}
          disabled={!ready}
          onClick={async () => {
            try {
              // 결제 데이터를 사용하여 백엔드할 주문 데이터 저장

              await widgets.requestPayment({
                orderId: sampeid, // 고유 주문 번호
                orderName: "토스 티셔츠 외 2건",
                successUrl: paymentData.successUrl,
                failUrl: paymentData.failUrl,
                customerEmail: paymentData.pcustomeremail,
                customerName: paymentData.pcustomername,
                customerMobilePhone: paymentData.pcustomerphonenum,
              });
            } catch (error) {
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
          onClick={() => navigate("/brandpay/checkout")}
        >
          위젯 없이 브랜드페이만 연동하기
        </button>
        <button
          className="button"
          style={{ marginTop: "30px" }}
          onClick={() => navigate("/payment/checkout")}
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