import React, { useEffect, useRef, useState } from "react";
import "./scss/InfiniteScroll.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faHeart } from "@fortawesome/free-solid-svg-icons";

const df = (date) => moment(date).format("YYYY-MM-DD");

const LatestProducts = () => {
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
  const [quantities, setQuantities] = useState({}); // 각 상품에 대한 수량을 상태로 관리

  const sellerId = "sellerId";
  const nav = useNavigate();
  console.log("페이지", page);
  console.log("상품", products);

  //상품 목록을 가져오는 함수
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

  // 장바구니에 상품을 추가하는 함수
  const cartList = (pc, quantity) => {
    console.log(pc);
    const nid = sessionStorage.getItem("nid");
    let conf = window.confirm("장바구니에 추가할까요?");
    if (!conf) {
      return;
    }

    axios
      .get("/setcart", {
        params: { cnid: nid, productCode: pc, quantity },
      })
      .then((res) => {
        console.log(res);
        if (res.data === "ok") {
          alert("추가되었습니다.");
        } else {
          alert("수량을 초과 하였습니다.");
        }
      })
      .catch((err) => {
        alert("돌아가");
        console.log(err);
      });
  };

  // 찜목록에 상품을 추가하는 함수
  const dibsList = (pc) => {
    console.log(pc);
    const nid = sessionStorage.getItem("nid");
    let conf = window.confirm("찜목록에 추가할까요?");
    if (!conf) {
      return;
    }

    axios
      .get("/setDibs", {
        params: { dnid: nid, productCode: pc },
      })
      .then((res) => {
        console.log(res);
        if (res.data === "ok") {
          alert("성공");
        } else {
          alert("실패");
        }
      })
      .catch((err) => {
        alert("돌아가렴");
        console.log(err);
      });
  };

  const handleQuantityChange = (productCode, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productCode]: value,
    }));
  };

  return (
    <div className="product-list">
      <h2 className="section-title">
        <span>최신</span>상품
      </h2>
      <div className="product-grid">
        {products.map((item, index) => {
          const quantity = quantities[item.productCode] || 1; // 각 상품의 수량 관리

          return (
            <div key={index} className="product-card">
              <div className="product-image-placeholder">
                <img
                  src={`upload/${item.productFileSysname}`}
                  alt={`상품 이미지 ${item.productCode}`}
                  className="product-image"
                />
              </div>
              <h3 className="product-title">상품명 : {item.productName} </h3>
              <p className="product-price">₩{item.sellerPayment}</p>
              <p className="product-body">{item.productDetail}</p>
              <div className="quantity-container">
                <label>개수: </label>
                <input
                  type="number"
                  min="1"
                  value={quantity} // 상태값을 input 값으로 설정
                  onChange={(e) =>
                    handleQuantityChange(
                      item.productCode,
                      parseInt(e.target.value) || 1
                    )
                  } // 수량 변경 시 상태 업데이트
                />
              </div>
              <button
                onClick={() => {
                  cartList(item.productCode, quantity); // 클릭 시 수량 전달
                }}
              >
                <FontAwesomeIcon
                  icon={faBagShopping}
                  style={{ color: "#000000" }}
                />
              </button>
              <button onClick={() => dibsList(item.productCode)}>
                <FontAwesomeIcon icon={faHeart} style={{ color: "#000000" }} />
              </button>
            </div>
          );
        })}
      </div>
      {hasNextPage && (
        <div ref={observerRef} className="loading-indicator">
          더 많은 상품 불러오는 중...
        </div>
      )}
    </div>
  );
};

export default LatestProducts;
