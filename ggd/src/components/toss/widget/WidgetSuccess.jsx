import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./WidgetSuccess.scss";

export function WidgetSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(null);
  console.log(responseData);
  useEffect(() => {
    async function confirm() {
      const requestData = {
        orderId: searchParams.get("orderId"),
        amount: searchParams.get("amount"),
        paymentKey: searchParams.get("paymentKey"),
      };

      const response = await fetch("/confirm", {
        //api/confirm/widget
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const json = await response.json();

      if (!response.ok) {
        throw { message: json.message, code: json.code };
      }

      return json;
    }

    confirm()
      .then((data) => {
        setResponseData(data);
      })
      .catch((error) => {
        console.log(error);
        navigate(`/fail?code=${error.code}&message=${error.message}`);
      });
  }, [searchParams]);

  const updateOrder = async () => {
    if (responseData.status == "DONE") {
      try {
        await axios.get("/updateorder", {
          params: {
            transactionId: responseData.orderId,
            method: responseData.method,
            provider: responseData.easyPay.provider,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  //주문건수 추가하는 함수

  const OrderConfirmation = () => {
    // 주문 완료 시 localStorage의 카운트를 증가시키는 함수
    const countOrderCompletion = () => {
      // 기존 카운트를 가져오거나 초기값 설정
      let orderCount = localStorage.getItem("orderCount") || 0;
      //숫자로 변환하고 1 증가
      orderCount = Number(orderCount) + 1;
      //증가된 카운트를 localStorage에 저장
      localStorage.setItem("orderCount", orderCount);
    };

    //컴포넌트가 처음 로드될때 주문완료 시 카운트 증가
    useEffect(() => {
      countOrderCompletion();
    }, []);
  };

  useEffect(() => {
    if (responseData) {
      updateOrder(); // responseData가 변경될 때마다 updateOrder 함수 호출
    }
  }, [responseData]); // responseData가 변경될 때마다 실행

  console.log(searchParams.get("orderId"));
  return (
    <>
      <div className="wcbox_section" style={{ width: "600px" }}>
        <img
          width="100px"
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
        />
        <h2>결제를 완료했어요</h2>
        <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
          <div className="p-grid-col text--left">
            <b>결제금액</b>
          </div>
          <div className="p-grid-col text--right" id="amount">
            {`${Number(searchParams.get("amount")).toLocaleString()}원`}
          </div>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>주문번호</b>
          </div>
          <div className="p-grid-col text--right" id="orderId">
            {`${searchParams.get("orderId")}`}
          </div>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>paymentKey</b>
          </div>
          <div
            className="p-grid-col text--right"
            id="paymentKey"
            style={{ whiteSpace: "initial", width: "250px" }}
          >
            {`${searchParams.get("paymentKey")}`}
          </div>
        </div>
        <div className="p-grid-col">
          <Link to="https://docs.tosspayments.com/guides/v2/payment-widget/integration">
            <button className="button p-grid-col5">연동 문서</button>
          </Link>
          <Link to="https://discord.gg/A4fRFXQhRu">
            <button
              className="button p-grid-col5"
              style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}
            >
              실시간 문의
            </button>
          </Link>
          <br/>
          <button 
              className="button p-grid-col5"
              onClick={() => navigate("/ShoppingMall")}    
          >
            쇼핑몰로 돌아가기
          </button>
        </div>
      </div>
      <div
        className="wcbox_section"
        style={{ width: "600px", textAlign: "left" }}
      >
        <b>Response Data :</b>
        <div id="response" style={{ whiteSpace: "initial" }}>
          {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
        </div>
      </div>
    </>
  );
}

// import { useEffect, useState } from "react";
// import { Link, useNavigate, useSearchParams } from "react-router-dom";

// export function WidgetSuccessPage() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const [responseData, setResponseData] = useState(null);
//   const [error, setError] = useState(null); // 에러 상태 추가

//   useEffect(() => {
//     async function confirm() {
//       const requestData = {
//         orderId: searchParams.get("orderId"),
//         amount: searchParams.get("amount"),
//         paymentKey: searchParams.get("paymentKey"),
//       };

//       try {
//         const response = await fetch("/api/confirm/widget", { //widsuccess
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(requestData),
//         });

//         const json = await response.json();

//         if (!response.ok) {
//           throw { message: json.message, code: json.code };
//         }

//         setResponseData(json); // 성공 시 데이터 설정
//       } catch (error) {
//         console.error("Error during confirmation:", error);
//         setError(error); // 에러 발생 시 상태 설정
//       }
//     }

//     confirm();
//   }, [searchParams.get("orderId"), searchParams.get("amount"), searchParams.get("paymentKey")]);

//   return (
//     <>
//       <div className="box_section" style={{ width: "600px" }}>
//         <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" />
//         <h2>결제를 완료했어요</h2>
//         <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
//           <div className="p-grid-col text--left">
//             <b>결제금액</b>
//           </div>
//           <div className="p-grid-col text--right" id="amount">
//             {`${Number(searchParams.get("amount")).toLocaleString()}원`}
//           </div>
//         </div>
//         <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
//           <div className="p-grid-col text--left">
//             <b>주문번호</b>
//           </div>
//           <div className="p-grid-col text--right" id="orderId">
//             {`${searchParams.get("orderId")}`}
//           </div>
//         </div>
//         <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
//           <div className="p-grid-col text--left">
//             <b>paymentKey</b>
//           </div>
//           <div className="p-grid-col text--right" id="paymentKey" style={{ whiteSpace: "initial", width: "250px" }}>
//             {`${searchParams.get("paymentKey")}`}
//           </div>
//         </div>
//         <div className="p-grid-col">
//           <Link to="https://docs.tosspayments.com/guides/v2/payment-widget/integration">
//             <button className="button p-grid-col5">연동 문서</button>
//           </Link>
//           <Link to="https://discord.gg/A4fRFXQhRu">
//             <button className="button p-grid-col5" style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}>
//               실시간 문의
//             </button>
//           </Link>
//         </div>
//       </div>
//       <div className="box_section" style={{ width: "600px", textAlign: "left" }}>
//         <b>Response Data :</b>
//         <div id="response" style={{ whiteSpace: "initial" }}>
//           {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
//         </div>
//         {error && ( // 에러 메시지 표시
//           <div style={{ color: "red", marginTop: "20px" }}>
//             <b>Error:</b> {error.message}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
