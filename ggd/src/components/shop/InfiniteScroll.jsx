import React, { useEffect, useRef, useState } from "react";
import "./scss/InfiniteScroll.scss";

// 24-10-16 09:20 더미이미지 -> 이미지 넣고 다시해보기
function InfiniteScroll() {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const elementRef = useRef(null);
  var count = 1;

  const fetchProducts = async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=5&skip=${page * 5}`
    );
    const data = await response.json();

    if (data.products.length === 0 || -page >= 1) {
      setHasMore(false);
    } else {
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      setPage((prevPage) => prevPage + 1);
      count += 1;
    }
  };

  const onIntersection = (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      fetchProducts();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (elementRef.current) {
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
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img
              // src="./images/27.JPG"
              alt={`상품 이미지 ${index + 1}`}
              className="product-image"
            />
            {/* <h3 className="product-title">{product-title}</h3> */}
            <p className="product-price">${product.price}</p>
            <p className="product-body">{product.description}</p>
          </div>
        ))}
      </div>
      {hasMore && (
        <div ref={elementRef} className="loading-indicator">
          Loading more product...
        </div>
      )}

      <h2 className="section-title">
        [굿즈]<span>최신</span>상품
      </h2>
      <div className="product-grid">
        {products.map((product, index) => (
          <div key={`latest-${index}`} className="product-card">
            <img
              // src="./images/28.JPG"
              alt={`상품 이미지 ${index + 1}`}
              className="product-image"
            />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price}</p>
            <p className="product-body">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfiniteScroll;
