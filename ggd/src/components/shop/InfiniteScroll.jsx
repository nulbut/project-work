import React, { useEffect, useRef, useState } from "react";
import "./scss/InfiniteScroll.scss";
import noimage from "../images/no-image.jpg";

// 24-10-16 09:20 더미이미지 -> 이미지 넣고 다시해보기
function InfiniteScroll() {
  const[items, setItems] = useState(Array.from({ length: 10 }));
  const[hasMore, setHasMore] = useState(true);
  const elementRef = useRef(null);

  const fetchMoreItems= () => {
    setTimeout(() => {
      setItems((prevItems) => [
        ...prevItems,
        ...Array.from({ length: 5 }),
      ]);
    }, 5000);
  };

  const onIntersection = (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      fetchMoreItems();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (elementRef.current){
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasMore]);

  return (
    <div className="product-list">
      <h2 className="section-title">
        [굿즈]<span>추천</span>상품
      </h2>
      <div className="product-grid">
        {items.map((_, index) => (
          <div key={index} className="product-card">
            <div className="product-image-placeholder">
              <img
                src={noimage}
                alt={`상품 이미지 ${items.productCode}`}
                className="product-image"
              />
            </div>
            <p className="product-price">₩{(index + 1) * 1000}</p>
            <p className="product-body">상품 설명 {index + 1}</p>
          </div>
        ))}
      </div>
      
      <h2 className="section-title">
        [굿즈]<span>최신</span>상품
      </h2>
      <div className="product-grid">
        {items.map((_, index) => (
          <div key={`latest-${index}`} className="product-card">
            <div className="product-image-placeholder">
              <img
                src={noimage}
                alt={`상품 이미지 ${items.productCode}`}
                className="product-image"
              />
            </div>
            <h3 className="product-title">상품명 {index + 1} </h3>
            <p className="product-price">₩{(index + 1) * 1000}</p>
            <p className="product-body">상품 설명 {index + 1}</p>
        </div>
        ))}
      </div>
      {hasMore && (
        <div ref={elementRef} className="loading-indicator">
          더 많은 상품 불러오는 중...
        </div>
      )}
    </div>
  )
}

export default InfiniteScroll;
