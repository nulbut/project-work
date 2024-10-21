import React, { useEffect, useRef, useState } from "react";
import "./scss/InfiniteScroll.scss";
import noimage from "../images/no-image.jpg";


function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 0;
  const elementRef = useRef(null);

  const fetchMoreItems = async() => {
    try {
      const response = await fetch(`/api/Products?offset=${offset}&limit=${limit}`);
      if(!response.ok){
        throw new Error ("데이터를 불러오는데 실패했습니다.");
      }
      const newItems = await response.json();
      if (newItems.length < limit){
        setHasMore(false);// 더 이상 불러올 데이터가 없으면
        //hasMore를 false로 설정 
      }

      setItems((prevItems) => //
    [...prevItems, ...newItems]);
      setOffset((prevOffset) => prevOffset + limit);
    } catch(error){
      console.error(error);
    }
  } ;

  const onIntersection = (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) 
      {
      fetchMoreItems();
    }
  };

  useEffect(() => {
    fetchMoreItems();// 처음 로드 시 데이터 가져오기

    const observer = new IntersectionObserver(onIntersection);
    if (elementRef.current){
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
        {items.map((item, index) => (
          <div key={item.id} className="product-card">
            <div className="product-image-placeholder">
              <img
                src={item.image || noimage}
                alt={`상품 이미지 ${item.name}`}
                className="product-image"
              />
            </div>
            <h3 className="product-title">상품명 {item + 1} </h3>
            <p className="product-price">₩{item.price}</p>
            <p className="product-body">{item.description}</p>
          </div>
        ))}
      </div>
      
      <h2 className="section-title">
        [굿즈]<span>최신</span>상품
      </h2>
      <div className="product-grid">
        {items.map((item, index) => (
          <div key={`latest-${item}`} className="product-card">
            <div className="product-image-placeholder">
              <img
                src={item.image || noimage}
                alt={`상품 이미지 ${items.name}`}
                className="product-image"
              />
            </div>
            <h3 className="product-title">상품명 {item + 1} </h3>
            <p className="product-price">₩{item.price}</p>
            <p className="product-body">{item.description}</p>
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
