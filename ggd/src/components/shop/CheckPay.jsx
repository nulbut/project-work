import React, { useState, useEffect } from "react";
import axios from "axios";
const CheckPay = () => {
  // 장바구니 데이터 상태
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
    const updatedItems = cartItems.map((item) =>
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
    <div>
      <h1>장바구니</h1>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} width="100" />
              <div>{item.name}</div>
              <div>가격: {item.price} 원</div>
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
  );
};
export default CheckPay;
