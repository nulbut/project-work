import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
// import "./scss/ProductDetails.scss";

const ProductDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const usedCode = location.state?.usedCode;

    //페이지 데이터 가져오기
useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/usedDetail`, {
            params: { usedCode },
        });
        setProduct(response.data);
      } catch (error) {
        console.log("에러 발생:", error);
      }
    };
    if (usedCode) fetchProductDetails();
}, [usedCode]);

if (!product){
    return <div>상품 정보를 불러오는 중 입니다.</div>;
}

const handlePurchase = () => {
    alert("구매 페이지로 이동합니다.");
    navigate("/", { state: { usedCode: product.usedCode } });
 };

const handleAddToCart = () => {
    alert("장바구니에 추가되었습니다.");
    //장바구니 추가 로직 구현
};

return (
    <div className="product-detail">
        <h2 className="product-detail-title">{product.usedName}</h2>
        <div className="product-detail-content">
            <div className="product-detail-image">
                <img
                  src={`/upload${product.usedFileCode}`}
                  alt={`상품 이미지 ${product.usedCode}`}
                  className="product-image"
                />
            </div>
            <div className="product-detail-info">
            <p><strong>판매자:</strong>{product.usedsellerId}</p>
            <p><strong>등록일:</strong>{moment(product.usedDate).format("YYYY-MM-DD")}</p>
            <p><strong>가격:</strong> ₩{product.usedseller}</p>
            <p><strong>설명:</strong> {product.usedDeail}</p>
            <div className="product-detail-actions">
                <button className="purchase-button" onClick={handlePurchase}></button>
                <button className="cart-button" onClick={handleAddToCart}></button>
            </div>
        </div>
    </div>
</div>
);
};


export default ProductDetails;