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
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUseds(page);
  }, [page]);

  useEffect(() => {
    if (usedsellerId === null) {
      nav("/", { replace: true });
      return;
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
          alert("장바구니에 추가되었습니다.");
        } else if (res.data === "상품 수량이 부족합니다.") {
          alert("수량이 재고를 초과합니다.");
        } else if (res.data === "이미 장바구니에 해당 상품이 있습니다.") {
          alert("이미 장바구니에 있습니다.");
        } else {
          alert("장바구니 추가 실패: " + res.data);
        }
      })
      .catch((err) => {
        alert("돌아가");
        console.log(err);
      });
  };

  // 찜목록에 상품을 추가하는 함수
  const dibsList = (ud) => {
    console.log(ud);
    const nid = sessionStorage.getItem("nid");
    let conf = window.confirm("찜목록에 추가할까요?");
    if (!conf) {
      return;
    }

    axios
      .get("/setusedDibs", {
        params: {
          dnid: nid,
          usedCode: ud, // 중고상품에 대해서만 usedCode 전달
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data === "ok") {
          alert("찜목록에 추가되었습니다.");
        } else if (res.data === "이미 찜한 상품입니다.") {
          alert("이미 찜한 상품입니다.");
        } else {
          alert("실패: " + res.data); // 서버에서 반환한 에러 메시지 표시
        }
      })
      .catch((err) => {
        alert("서버 오류 발생. 잠시 후 다시 시도해주세요.");
        console.log(err);
      });
  };

  return (
    <div className="product-list">
      <h2 className="section-title">
        <span>중고</span>상품
      </h2>
      <div className="product-grid">
        {useds.map((item, index) => {
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
              <div className="product-price">
                <strong>가격: </strong>
                {item.usedSeller}₩
              </div>
              <div className="product-quantity">
                <strong>제품내용: </strong>
                {item.usedDetail}
              </div>
              {/* 총 재고 수량을 표시 */}
              <div className="product-quantity">
                <strong>총 수량:</strong> {item.usedStock || "N/A"}
              </div>
              <div className="product-quantity">
                <strong>등록일: </strong>
                {df(item.usedDate)}
              </div>
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
                  <Button wsize="s-25">제품 상세</Button>
                </Link>
                <Button
                  wsize="s-25"
                  onClick={() => {
                    const quantity = 1; // 예시로 1개를 기본 수량으로 설정
                    cartList(item.usedCode, quantity); // 클릭 시 수량 전달
                  }}
                >
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    style={{ color: "#000000", fontSize: "1.5em" }}
                  />
                </Button>
                <Button
                  wsize="s-25"
                  color="black"
                  onClick={() => dibsList(item.usedCode)}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ color: "#ff0000", fontSize: "1.5em" }}
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
