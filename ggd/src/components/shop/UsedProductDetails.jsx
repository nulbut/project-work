import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "./scss/ProductDetails.scss";

const UsedProductDetails = () => {
  const [activeTab, setActiveTab] = useState("content");
  const location = useLocation();
  const navigate = useNavigate();
  const [usedProductData, setUsedProductData] = useState(null); // 중고상품 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  const { code } = location.state || {}; // 중고상품 코드

  const usedCode = code;

  useEffect(() => {
    const fetchUsedProductDetails = async () => {
      if (!usedCode) {
        setError("상품 코드가 없습니다.");
        setLoading(false);
        return;
      }

      setLoading(true); // 로딩 시작
      setError(null); // 에러 초기화

      try {
        // 중고상품 데이터 요청
        const response = await axios.get("/getusedproduct", {
          params: { usedCode },
        });
        setUsedProductData({
          ...response.data,
          guideImage: "/images/information.PNG"
        });
      } catch(error) {
        console.error("데이터 로딩 실패", error);
        setError("상품 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }
    fetchUsedProductDetails();
  }, [usedCode]);
      
  // 로딩 중일 때
  if (loading) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  // 에러가 발생했을 때
  if (error) {
    return <div>{error}</div>;
  }

  // 중고상품 데이터가 없을 경우
  if (!usedProductData) {
    return <div>상품 정보를 찾을 수 없습니다.</div>;
  }
  const {
    usedName,
    usedFileSysname,
    usedsellerId,
    usedDate,
    usedcategoryCode,
    usedSeller,
    usedDetail,
    usedproductFileTblList,
  } = usedProductData;

  const handlePurchase = () => {
    alert("구매 페이지로 이동합니다.");
    navigate("/widgetcheckout", { state: { usedCode } }); // 중고상품 코드 전달
  };

  const handleAddToCart = () => {
    alert("장바구니에 추가되었습니다.");
    // 장바구니 추가 구현
  };

  const handleReport = () => {
    alert("신고 페이지로 이동합니다.");
    navigate("/report"); // 신고 페이지로 이동
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);// 클릭한 탭을 활성화
  }

  console.log(usedProductData);
  return (
    <div className="product-detail">
      <h2 className="product-detail-title">{usedProductData?.usedName}</h2>

      <div className="product-detail-content">
        <div className="product-detail-image">
          {usedProductData?.usedproductFileTblList[0].usedFileSysname ? (
            <img
              src={`usupload/${usedProductData.usedproductFileTblList[0].usedFileSysname}`}
              alt={`상품 이미지 ${usedProductData.usedName}`}
              className="product-image"
            />
          ) : (
            <div>이미지를 불러올 수 없습니다.</div>
          )}
        </div>

        <div className="product-detail-info">
          <div>
            <p>
              <strong>상품명 : </strong>
              {usedProductData?.usedName}
            </p>
            <p>
              <strong>판매자 : </strong>
              {usedProductData?.usedsellerId}
            </p>
            <p>
              <strong>등록일 : </strong>
              {moment(usedProductData?.usedDate).format("YYYY-MM-DD")}
            </p>
            <p>
              <strong>종류 : </strong>
              {usedProductData?.usedcategoryCode}
            </p>
            <p>
              <strong>가격 : </strong>₩{usedProductData?.usedSeller}
            </p>
            <p>
              <strong>제품 상세 설명 :</strong>
              {usedProductData?.usedDetail}
            </p>
          </div>

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

      {/* 탭 관련 내용 */}
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
            className={`tab-item ${activeTab === "information"? "active" : ""}`}
            onClick={() => handleTabClick("information")}
          >
            상품구매안내
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
            <p>{usedProductData?.usedDetail}
            </p>
          </div>
          <div
            className={`tab-pane ${activeTab === "reviews" ? "active" : ""}`}
          >
            {/* 후기 내용이 여기 들어갑니다. */}
            <p>등록된 후기가 없습니다.</p>
          </div>
          <div
            className={`tab-pane ${activeTab === "information" ? "active" : ""}`}
          >
            <p>구매안내 내용이 여기 들어갑니다.</p>
            {usedProductData?.guideImage && (
              <img
                src={usedProductData.guideImage}
                alt="구매 안내 이미지"
                className="guide-image"
                // onError={(e) => {
                //   e.target.style.display = "none";
                //   console.error("구매 안내 이미지 로드 실패");
                // }}
              />
            )}
          </div>
          <div className={`tab-pane ${activeTab === "questions" ? "active" : ""}`}>
              {/* 문의내용이 여기 들어갑니다. */}
            <p>현재 등록된 문의 사항이 없습니다.</p>
          </div>
          <div className={`tab-pane ${activeTab === "specifications" ? "active" : ""}`}>
            <p>제품 규격 내용이 여기 들어갑니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsedProductDetails;
