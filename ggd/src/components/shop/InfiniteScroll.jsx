import React, { useEffect, useRef, useState } from "react";
import "./scss/InfiniteScroll.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
// import Button from "./Button";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";

import { faBagShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";

const df = (date) => moment(date).format("YYYY-MM-DD HH:mm:ss");

const InfiniteScroll = () => {
  const [useds, setUsed] = useState([]);
  //검색 필터링된 상품
  const [filteredUseds, setFilteredUseds] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState({
    //페이징 관련 정보 저장
    totalPage: 0,
    pageNum: 1,
  });

  const [pageu, setPageu] = useState({
    //페이징 관련 정보 저장
    totalPage: 0,
    pageNum: 1,
  });
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageParamsu, setPageParamsu] = useState([]);
  const [pageParams, setPageParams] = useState([]);
  const observerRef = useRef();

  const sellerId = "sellerId";
  const nav = useNavigate();
  console.log("페이지", page);
  console.log("상품", products);
  const fetchUseds = async (inpage) => {
    if (pageParamsu.includes(inpage.pageNum)) return;
    setLoading(true);
    try {
      const res = await axios.get("usedList", {
        params: { pageNum: inpage.pageNum },
      });
      const { uList, totalPage, pageNum } = res.data;
      setPageu({ totalPage, pageNum });
      setUsed((prevUsed) => [...prevUsed, ...uList]);
      setFilteredUseds((prevUsed) => [...prevUsed, ...uList]);
      setPageParamsu((prev) => [...prev, inpage.pageNum]);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  const fetchProducts = async (inpage) => {
    //중복 호출 제거
    if (pageParams.includes(inpage.pageNum)) return;
    setLoading(true);
    try {
      axios
        .get("bpdList", { params: { pageNum: inpage.pageNum } })
        .then((res) => {
          const { bList, totalPage, pageNum } = res.data;
          setPage({ totalPage: totalPage, pageNum: pageNum });
          setProducts((preProducts) => [...preProducts, ...bList]);

          setPageParams((prev) => [...prev, inpage.pageNum]);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("error", error);
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
    fetchUseds(pageu);
  }, [pageu]);

  useEffect(() => {
    if (sellerId === null) {
      nav("/", { replace: true });

      return; //로그인 안한 경우 첫 화면으로 이동.
    }

    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];

      if (firstEntry.isIntersecting) {
        setPageu((prev) => {
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
  const cartList = (bpn, quantity) => {
    console.log(bpn);
    const nid = sessionStorage.getItem("nid");
    let conf = window.confirm("장바구니에 추가할까요?");
    if (!conf) {
      return;
    }

    axios
      .get("/setStorecart", {
        params: { cnid: nid, bpnum: bpn, quantity },
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
  const dibsList = (bpn) => {
    console.log(bpn);
    const nid = sessionStorage.getItem("nid");
    let conf = window.confirm("찜목록에 추가할까요?");
    if (!conf) {
      return;
    }

    axios
      .get("/setDibs", {
        params: { dnid: nid, bpnum: bpn },
      })
      .then((res) => {
        console.log(res);
        if (res.data === "ok") {
          alert("찜목록에 추가되었습니다.");
        } else if (res.data === "이미 찜한 상품입니다.") {
          alert("이미 찜한 상품입니다.");
        } else {
          alert("실패:" + res.data);
        }
      })
      .catch((err) => {
        alert("돌아가렴");
        console.log(err);
      });
  };
  const handleClick = () => {
    alert("구매페이지로 이동합니다");
    nav("/widgetcheckout"); //, { state: { data:usedProductData } }
  };
  const addPage = () => {
    setPage((prev) => {
      return {
        ...prev,
        pageNum: prev.pageNum + 1,
      };
    });
  };
  console.log(products);
  console.log(useds);
  return (
    <>
      <div className="spproduct-list">
        <h2 className="spsection-title">
          <span>입점</span>상품
        </h2>
        <div className="spproduct-grid">
          {products.map((item, index) => (
            <div key={index} className="spproduct-card">
              <div className="spproduct-image-placeholder">
                <img
                  src={`productupload/${item.bproductFileSysnameM}`}
                  alt={`상품 이미지 ${item.productCode}`}
                  className="spproduct-image"
                />
              </div>
              <h3 className="spproduct-title">상품명 : {item.bpname} </h3>
              <div className="spproduct-price">
                <strong>가격: </strong>
                {item.bpprice}₩
              </div>
              <div className="spproduct-quantity">
                <strong>제품내용: </strong>
                {item.bpexplanation}
              </div>
              {/* 총 재고 수량을 표시 */}
              <div className="spproduct-quantity">
                <strong>재고:</strong> {item.bpwarestock || "N/A"}
              </div>
              <div className="sppruduct-quantity">
                <strong>등록일: {df(item.bpdate)}</strong>
              </div>
              <div className="sppruduct-quantity">
                <strong>판매자: {item.bsellerId}</strong>
              </div>
              <div className="spbtn-set">
                <Link to={`/usedproductbuy/${item.usedCode}`}>
                  <Button wsize="s-25">구매하기</Button>
                </Link>
                <Link
                  to={`/storedetail`}
                  state={{
                    code: item.bpnum,
                    name: item.bpname,
                    sellerId: item.bsellerId,
                    detail: item.bpexplanation,
                    seller: item.bpprice,
                    imageNum: item.bproductFileSysnameM,
                  }}
                >
                  <Button wsize="s-25">제품 상세</Button>
                </Link>
                <Button
                  wsize="s-25"
                  onClick={() => {
                    const quantity = 1; // 예시로 1개를 기본 수량으로 설정
                    cartList(item.bpnum, quantity); // 클릭 시 수량 전달
                  }}
                >
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    style={{ color: "#000000", fontSize: "1.5em" }}
                  />
                </Button>
                <Button wsize="s-25" onClick={() => dibsList(item.bpnum)}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ color: "#ff0000", fontSize: "1.5em" }}
                  />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={addPage} className="loading-indicator">
        더 많은 상품 불러오기
      </button>
      <div className="usedproduct-list">
        <h2 className="upsection-title">
          <span>중고</span>상품
        </h2>
        <div className="upproduct-grid">
          {useds.map((item, index) => (
            <div key={index} className="upproduct-grid-item">
              <Link
                to={`/usedpddetails`}
                state={{
                  code: item.usedCode,
                  name: item.usedName,
                  sellerId: item.usedsellerId,
                  detail: item.usedDetail,
                  seller: item.usedSeller,
                  imageNum: item.usedFileSysname,
                }}
              >
                <div className="upproduct-image-placeholder">
                  {item.usedproductFileTblList[0]?.usedFileSysname ? (
                    <img
                      src={`usupload/${item.usedproductFileTblList[0].usedFileSysname}`}
                      alt={`상품 이미지 ${item.usedCode}`}
                      className="upproduct-image"
                    />
                  ) : (
                    <div>이미지를 불러올 수 없습니다.</div>
                  )}
                </div>

                <h3 className="upproduct-title">{item.usedName}</h3>
              </Link>
              <div className="upproduct-price">{item.usedSeller} 원</div>
              <div className="upproduct-quantity">
                <strong>제품내용 : {item.usedDetail}</strong>
              </div>
              <div className="upproduct-quantity">
                <strong>재고 : {item.usedStock || "N/A"}</strong>
              </div>
              <div className="upproduct-quantity">
                <strong>등록일 : {df(item.usedDate)}</strong>
              </div>
              <div className="upbtn-set">
                <Link to={`/widgetcheckout`} onClick={handleClick}>
                  구매하기
                </Link>
                <Link
                  to={`/usedpddetails`}
                  state={{
                    code: item.usedCode,
                    name: item.usedName,
                    sellerId: item.usedsellerId,
                    detail: item.usedDetail,
                    seller: item.usedSeller,
                    imageNum: item.usedinfo,
                  }}
                >
                  상세정보
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
                <Button wsize="s-25" onClick={() => dibsList(item.usedCode)}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ color: "#ff0000", fontSize: "1.5em" }}
                  />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {hasNextPage && (
        <div ref={observerRef} className="loading-indicator">
          더 많은 상품 불러오는 중...
        </div>
      )}
    </>
  );
};

export default InfiniteScroll;
