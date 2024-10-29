import React, { useEffect, useRef, useState } from "react";
import "./scss/InfiniteScroll.scss";
import noimage from "../images/no-image.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Button from "./Button";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";


const df = (date) => moment(date).format("YYYY-MM-DD HH:mm:ss");

const InfiniteScroll = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState({
    //페이징 관련 정보 저장
    totalPage: 0,
    pageNum: 1,
  });
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageParams, setPageParams] = useState([]);
  const observerRef = useRef();

  const sellerId = "sellerId";
  const nav = useNavigate();
  console.log("페이지", page);
  console.log("상품", products);
  const fetchProducts = async (inpage) => {
    //중복 호출 제거
    if (pageParams.includes(inpage.pageNum)) return;
    setLoading(true);
    try {
      axios
        .get("productList", { params: { pageNum: inpage.pageNum } })
        .then((res) => {
          const { bList, totalPage, pageNum } = res.data;
          setPage({ totalPage: totalPage, pageNum: pageNum });
          setProducts((preProducts) => [...preProducts, ...bList]);
          setHasNextPage(pageNum < totalPage);
          setPageParams((prev) => [...prev, inpage.pageNum]);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const options = [
    { value: "productName", label: "상품이름" },
    { value: "productDetail", label: "내용" },
  ];

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  useEffect(() => {
    if (sellerId === null) {
      nav("/", { replace: true });

      return; //로그인 안한 경우 첫 화면으로 이동.
    }

    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];

      if (firstEntry.isIntersecting) {
        setPage((prev) => {
          return {
            ...prev,
            pageNum: prev.pageNum + 1,
          };
        });
        console.log("옵저버페이지", page);
      } else {
        console.log("안보임");
      }
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, []);

  //출력할 상품 목록
  let list = null;
  if (products.length === 0) {
    list = (
      <TableRow key={0}>
        <TableColumn span={4}>상품이 없습니다.</TableColumn>
      </TableRow>
    );
  } else {
    list = Object.values(products).map((item) => (
      <TableRow key={item.productCode}>
        <TableColumn wd="w-10">{item.productCode}</TableColumn>
        <TableColumn wd="w-40">
          <div onClick={() => getBoard(item.productCode)}>
            {item.productName}
          </div>
        </TableColumn>
        <TableColumn wd="w-20">{item.sellerId}</TableColumn>
        <TableColumn wd="w-30">{df(item.productDate)}</TableColumn>
      </TableRow>
    ));
  }

  const getBoard = (code) => {
    nav("/ShoppingMall", { state: { productCode: code } });
  };

  return (
    <div className="product-list">
      <h2 className="section-title">
        [굿즈]<span>추천</span>상품
      </h2>
      <div className="product-grid">
        {products.map((item, index) => (
          <div key={index} className="product-card">
            <div className="product-image-placeholder">
              <img
                src={`upload/${item.productFileSysname}`}
                alt={`상품 이미지 ${item.productCode}`}
                className="product-image"
              />
            </div>
            <h3 className="product-title">상품명 : {item.productName + 1} </h3>
            <p className="product-price">₩{item.sellerPayment}</p>
            <p className="product-body">{item.productDetail}</p>
          </div>
        ))}
      </div>

      <h2 className="section-title">
        [굿즈]<span>최신</span>상품
      </h2>
      <div className="product-grid">
        {products.map((item, index) => (
          <div key={index} className="product-card">
            <div className="product-image-placeholder">
              <img
                src={`upload/${item.productFileSysname}`}
                alt={`상품 이미지 ${item.productCode}`}
                className="product-image"
              />
            </div>
            <h3 className="product-title">상품명 : {item.productName + 1} </h3>
            <p className="product-price">₩{item.sellerPayment}</p>
            <p className="product-body">{item.productDetail}</p>
        </div>
        ))}
      </div>
      {hasNextPage && (
        <div ref={observerRef} className="loading-indicator">
          더 많은 상품 불러오는 중...
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
