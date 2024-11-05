import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "./scss/ProductDetails.scss";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [useds, setUsed] = useState();
  const code = location.state;
  const usedCode = code.code;

  console.log(usedCode);

  //페이지 데이터 가져오기
  useEffect(() => {
    const fetchusedsDetails = async () => {
      try {
        const response = await axios.get(`/getusedproduct`, {
          params: { usedCode },
        });
        console.log(response.data);
        setUsed(response.data);
      } catch (error) {
        console.log("데이터 로딩 실패", error);
      }
    };
    if (usedCode) fetchusedsDetails();
  }, [usedCode]);
  console.log("데이터 로딩 실패");

  if (!useds) {
    return <div>상품 정보를 불러오는 중 입니다.</div>;
  }

  const handlePurchase = () => {
    alert("구매 페이지로 이동합니다.");
    navigate("/pdpurchase", { state: { usedCode: useds.usedCode } });
  };

  const handleAddToCart = () => {
    alert("장바구니에 추가되었습니다.");
    //장바구니 추가 구현
  };
  const handleReport = () => {
    alert("신고페이지로 이동합니다.");
    navigate("/");
  };

  console.log(useds);
  return (
    <div className="product-detail">
      <h2 className="product-detail-title">{useds.usedName}</h2>
      <div className="product-detail-content">
        <div className="product-detail-image">
          {useds.usedproductFileTblList[0].usedFileSysname != null ? (
            <img
              src={`/usupload/${useds.usedproductFileTblList[0].usedFileSysname}`}
              alt={`상품 이미지 ${useds.usedFileCode}`}
              className="product-image"
            />
          ) : (
            <div>이미지를 불러올 수 없습니다.</div>
          )}
          {useds.usedFileSysname}
        </div>
        {/* <img
            src={`/usupload/${product.usedFileSysname}`}
            alt={`상품 이미지 ${product.usedFileCode}`}
            className="product-image"
          />
          {product.usedFileSysname}
        </div> */}
        <div className="product-detail-info">
          <p>
            <strong>판매자 : </strong>
            {useds.usedsellerId}
          </p>
          <p>
            <strong>등록일 : </strong>
            {moment(useds.usedDate).format("YYYY-MM-DD")}
          </p>
          <strong>종류</strong> {useds.usedcategoryCode}
          <p>
            <strong>가격 : </strong> ₩{useds.usedSeller}
          </p>
          <p>
            <strong>제품 상세 설명 :</strong> {useds.usedDetail}
          </p>
          <div className="product-detail-actions">
            <button
              className="purchase-button"
              onClick= {handlePurchase}
            >구매하기</button>
            <button className="cart-button" onClick={handleAddToCart}>장바구니</button>
            <button className="report-button" onClick={handleReport}>신고하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
