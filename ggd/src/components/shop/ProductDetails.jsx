import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "./scss/ProductDetails.scss";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const code = location.state;
  const usedCode = code.code;

  console.log(usedCode);

  //페이지 데이터 가져오기
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/getusedproduct`, {
          params: { usedCode },
        });
        setProduct(response.data);
      } catch (error) {
        console.log("데이터 로딩 실패", error);
      }
    };
    if (usedCode) fetchProductDetails();
  }, [usedCode]);
  console.log("데이터 로딩 실패");

  if (!product) {
    return <div>상품 정보를 불러오는 중 입니다.</div>;
  }

  const handlePurchase = () => {
    alert("구매 페이지로 이동합니다.");
    navigate("/", { state: { usedCode: product.usedCode } });
  };

  const handleAddToCart = () => {
    alert("장바구니에 추가되었습니다.");
    //장바구니 추가 구현
  };
  const handleReport = () => {
    alert("신고페이지로 이동합니다.");
    navigate("/");
  };

  console.log(product);
  return (
    <div className="product-detail">
      <h2 className="product-detail-title">{product.usedName}</h2>
      <div className="product-detail-content">
        <div className="product-detail-image">
          <img
            src={`usupload/${product.usedFileSysname}`}
            alt={`상품 이미지 ${product.usedFileCode}`}
            className="product-image"
            // onError={(e) => (e.target.src = "../../../upload")}
          />
        </div>
        <div className="product-detail-info">
          <p>
            <strong>판매자 : </strong>
            {product.usedsellerId}
          </p>
          <p>
            <strong>등록일 : </strong>
            {moment(product.usedDate).format("YYYY-MM-DD")}
          </p>
          <strong>종류</strong> {product.usedcategoryCode}
          <p>
            <strong>가격 : </strong> ₩{product.usedSeller}
          </p>
          <p>
            <strong>제품 상세 설명 :</strong> {product.usedDetail}
          </p>
          <div className="product-detail-actions">
            <button
              className="purchase-button"
              onClick={handlePurchase}
            ></button>
            <button className="cart-button" onClick={handleAddToCart}></button>
            <button className="report-button" onClick={handleReport}></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
