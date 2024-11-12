import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "./scss/ProductDetails.scss";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("content");
  const location = useLocation();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null); // 합친 데이터를 저장할 state
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리
  const [error, setError] = useState(null); // 에러 상태를 관리

  // location.state에서 productCode와 usedCode를 받아옵니다.
  const { code, productCode: productCodeFromState } = location.state || {}; // state에서 코드 값을 가져오고, 없으면 빈 객체로 초기화

  const usedCode = code || null; // `usedCode`가 존재하지 않으면 `null`
  const productCode = productCodeFromState || null; // `productCode`가 존재하지 않으면 `null`

  // 디버깅을 위한 콘솔 출력
  console.log("location.state:", location.state);
  console.log("usedCode:", usedCode);
  console.log("productCode:", productCode);

  // 페이지 데이터 가져오기
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!usedCode && !productCode) {
        setError("상품 코드가 없습니다.");
        setLoading(false);
        return;
      }

      setLoading(true); // 로딩 시작
      setError(null); // 에러 초기화

      // 중고상품과 신상품 데이터 요청을 병렬로 처리
      try {
        const [usedProductResponse, productResponse] = await Promise.all([
          usedCode
            ? axios.get("/getusedproduct", { params: { usedCode } })
            : null, // 중고상품
          productCode
            ? axios.get("/getproduct", { params: { productCode } })
            : null, // 신상품
        ]);

        // 신상품과 중고상품 데이터를 합침
        const productDetails = {
          ...(usedProductResponse ? usedProductResponse.data : {}), // 중고상품 데이터
          productInfo: productResponse ? productResponse.data : {}, // 신상품 데이터
        };

        console.log("합쳐진 데이터:", productDetails);
        setProductData(productDetails); // 상태 업데이트
      } catch (error) {
        console.error("데이터 로딩 실패", error);
        setError("상품 정보를 불러오는 데 실패했습니다."); // 에러 메시지 설정
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchProductDetails();
  }, [usedCode, productCode]);

  // 로딩 중일 때
  if (loading) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  // 에러가 발생했을 때
  if (error) {
    return <div>{error}</div>;
  }

  if (!productData) {
    return <div>상품 정보를 찾을 수 없습니다.</div>;
  }

  const {
    productInfo,
    usedName,
    usedFileSysname,
    usedsellerId,
    usedDate,
    usedcategoryCode,
    usedSeller,
    usedDetail,
    usedproductFileTblList,
  } = productData;

  const handlePurchase = () => {
    alert("구매 페이지로 이동합니다.");
    navigate("/widgetcheckout", { state: { usedCode } });
  };

  // const cartList = (ud, quantity) => {
  //   console.log(ud)
  //   const nid = sessionStorage.getItem("nid");
  //   let conf = window.confirm("장바구니에 추가할까요?");
  //   if (!conf) {
  //     return;
  //   }
  //   axios
  //     .get("/setusedcart", {
  //       params: { cnid: nid, usedCode: ud, quantity },
  //     })
  //     .then
  // }

  const handleAddToCart = () => {
    alert("장바구니에 추가되었습니다.");
    // 장바구니 추가 구현
  };

  const handleReport = () => {
    alert("신고 페이지로 이동합니다.");
    navigate("/");
  };

  console.log("상품 데이터:", productData);
  const handleTabClick = (tab) => {
    setActiveTab(tab); // 클릭한 탭을 활성화
  };
  return (
    <div className="product-detail">
      {/* Title: 신상품이 있으면 productName, 아니면 usedName */}
      <h2 className="product-detail-title">
        {productCode ? productInfo?.productName : usedName}
      </h2>

      <div className="product-detail-content">
        <div className="product-detail-image">
          {/* 이미지 처리 */}
          {productCode ? (
            productInfo?.image ? (
              <img
                src={`upload/${productInfo.image}`}
                alt={`상품 이미지 ${productInfo.productName}`}
                className="product-image"
              />
            ) : (
              <div>이미지를 불러올 수 없습니다.</div>
            )
          ) : usedproductFileTblList &&
            usedproductFileTblList[0]?.usedFileSysname != null ? (
            <img
              src={`/usupload/${usedproductFileTblList[0].usedFileSysname}`}
              alt={`상품 이미지 ${usedFileSysname}`}
              className="product-image"
            />
          ) : (
            <div>이미지를 불러올 수 없습니다.</div>
          )}
        </div>

        <div className="product-detail-info">
          {/* 신상품 정보 */}
          {productCode ? (
            <div>
              <p>
                <strong>상품명 : </strong>
                {productInfo?.productName}
              </p>
              <p>
                <strong>가격 : </strong> ₩{productInfo?.price}
              </p>
              <p>
                <strong>판매자 : </strong>
                {productInfo?.seller}
              </p>
              <p>
                <strong>상세 설명 : </strong> {productInfo?.description}
              </p>
            </div>
          ) : (
            // 중고상품 정보
            <div>
              <p>
                <strong>판매자 : </strong>
                {usedsellerId}
              </p>
              <p>
                <strong>등록일 : </strong>
                {moment(usedDate).format("YYYY-MM-DD")}
              </p>
              <strong>종류 : </strong> {usedcategoryCode}
              <p>
                <strong>가격 : </strong> ₩{usedSeller}
              </p>
              <p>
                <strong>제품 상세 설명 :</strong> {usedDetail}
              </p>
            </div>
          )}

          <div className="product-detail-actions">
            <button className="purchase-button" onClick={handlePurchase}>
              구매하기
            </button>
            <button className="cart-button" onClick={handleAddToCart}>
              장바구니
            </button>
            <button className="report-button" onClick={handleReport}>
              신고하기
            </button>
          </div>
        </div>
      </div>
      <div className="product-detail-tabs">
        <div className="tab-header">
          <div
            className={`tab-item ${activeTab === "content" ? "active" : ""}`}
            onClick={() => handleTabClick("content")}
          >
            내용
          </div>
          <div
            className={`tab-item ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => handleTabClick("reviews")}
          >
            후기
          </div>
          <div
            className={`tab-item ${activeTab === "questions" ? "active" : ""}`}
            onClick={() => handleTabClick("questions")}
          >
            문의사항
          </div>
          <div
            className={`tab-item ${
              activeTab === "specifications" ? "active" : ""
            }`}
            onClick={() => handleTabClick("specifications")}
          >
            제품규격
          </div>
        </div>

        <div className="tab-content">
          <div
            className={`tab-pane ${activeTab === "content" ? "active" : ""}`}
          >
            <p>상품의 상세 내용이 여기 들어갑니다.</p>
          </div>
          <div
            className={`tab-pane ${activeTab === "reviews" ? "active" : ""}`}
          >
            <p>후기 내용이 여기 들어갑니다.</p>
          </div>
          <div
            className={`tab-pane ${activeTab === "questions" ? "active" : ""}`}
          >
            <p>문의사항 내용이 여기 들어갑니다.</p>
          </div>
          <div
            className={`tab-pane ${
              activeTab === "specifications" ? "active" : ""
            }`}
          >
            <p>제품 규격 내용이 여기 들어갑니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
