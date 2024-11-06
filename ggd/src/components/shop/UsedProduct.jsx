import React, { useEffect, useRef, useState } from "react";
import "./scss/InfiniteScroll.scss";
import axios from "axios";
import moment from "moment";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faHeart } from "@fortawesome/free-solid-svg-icons";

const df = (date) => moment(date).format("YYYY-MM-DD");

const UsedProduct = () => {
  const [useds, setUsed] = useState([]);
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  });
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageParams, setPageParams] = useState([]);
  const observerRef = useRef();
  const [quantities, setQuantities] = useState({}); // 각 상품에 대한 수량을 상태로 관리

  const usedsellerId = "usedsellerId"; // Placeholder for seller ID
  const nav = useNavigate();

  console.log("페이지", page);
  console.log("중고상품", useds);

  // Fetch used products from API
  const fetchUseds = async (inpage) => {
    if (pageParams.includes(inpage.pageNum)) return; // Prevent duplicate API calls
    setLoading(true);
    try {
      const res = await axios.get("usedList", {
        params: { pageNum: inpage.pageNum },
      });
      const { uList, totalPage, pageNum } = res.data;
      setPage({ totalPage, pageNum });
      setUsed((prevUsed) => [...prevUsed, ...uList]);
      setHasNextPage(pageNum < totalPage);
      setPageParams((prev) => [...prev, inpage.pageNum]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching used products", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUseds(page);
  }, [page]);

  useEffect(() => {
    if (usedsellerId === null) {
      nav("/", { replace: true });
      return; // Redirect to homepage if not logged in
    }

    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting) {
        setPage((prev) => ({ ...prev, pageNum: prev.pageNum + 1 }));
        console.log("옵저버", page);
      }
    });

    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, []);

  // 장바구니에 상품을 추가하는 함수
  const cartList = (ud, quantity) => {
    console.log(ud);
    const nid = sessionStorage.getItem("nid");
    let conf = window.confirm("장바구니에 추가할까요?");
    if (!conf) {
      return;
    }

    axios
      .get("/setusedcart", {
        params: { cnid: nid, usedCode: ud, quantity },
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

  const handleQuantityChange = (usedCode, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [usedCode]: value,
    }));
  };
  return (
    <div className="product-list">
      <h2 className="section-title">
        <span>중고</span>상품
      </h2>
      <div className="product-grid">
        {useds.map((item, index) => {
          const quantity = quantities[item.usedCode] || 1; // 각 상품의 수량 관리
          return (
            <div key={index} className="product-card">
              <div className="product-image-placeholder">
                {item.usedFileSysname ? (
                  <img
                    src={`/usupload/${item.usedFileSysname}`}
                    alt={`상품 이미지 ${item.usedCode}`}
                    className="product-image"
                  />
                ) : (
                  <div>이미지를 불러올 수 없습니다.</div>
                )}
              </div>
              <h3 className="product-title">상품명 : {item.usedName}</h3>
              <p className="product-price">₩{item.usedSeller}</p>
              <p className="product-body">{item.usedDetail}</p>
              <div className="btn-set">
                <Link to={`/usedproductbuy/${item.usedCode}`}>
                  <Button wsize="s-25">구매하기</Button>
                </Link>
                <Link
                  to={`/pddetails`}
                  state={{
                    code: item.usedCode,
                    name: item.usedName,
                    sellerId: item.usedsellerId,
                    detail: item.usedDetail,
                    seller: item.usedSeller,
                    imageNum: item.usedFileSysname,
                  }}
                >
                  <Button wsize="s-10">제품 상세</Button>
                </Link>
                <div className="product-body">
                  <label>개수: </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity} // 상태값을 input 값으로 설정
                    onChange={(e) =>
                      handleQuantityChange(
                        item.usedCode,
                        parseInt(e.target.value) || 1
                      )
                    } // 수량 변경 시 상태 업데이트
                  />
                </div>
                <Button
                  wsize="s-25"
                  onClick={() => {
                    cartList(item.usedCode, quantity); // 클릭 시 수량 전달
                  }}
                >
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    style={{ color: "#000000", fontSize: "1.5em" }}
                  />
                </Button>
              </div>
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

export default UsedProduct;
