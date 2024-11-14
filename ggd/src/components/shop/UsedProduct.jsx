import React, { useEffect, useRef, useState } from "react";
import "./scss/UsedList.scss";
import "./scss/InfiniteScroll.scss";
import axios from "axios";
import moment from "moment";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const df = (date) => moment(date).format("YYYY-MM-DD");

const UsedProduct = () => {
  const [useds, setUsed] = useState([]);
  //검색 필터링된 상품
  const [filteredUseds, setFilteredUseds] = useState([]);

  const [page, setPage] = useState({
    //페이징 관련 정보 저장
    totalPage: 0,
    pageNum: 1,
  });
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageParams, setPageParams] = useState([]);
  const observerRef = useRef();

  //검색 상태 추가
  const [searchCategory, setSearchCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const nav = useNavigate();

  const usedsellerId = "usedsellerId"; // Placeholder for seller ID

  console.log("페이지", page);
  console.log("중고상품", useds);

  // 서버로부터 등록한 상품을 불러오는 함수
  const fetchUseds = async (inpage) => {
    if(pageParams.includes(inpage.pageNum)) return;
    setLoading(true);
    try{
      const res = await axios.get("usedList", {
        params: { pageNum: inpage.pageNum },
      });
      const { uList, totalPage, pageNum } = res.data;
      setPage({ totalPage, pageNum });
      setUsed((prevUsed) => [...prevUsed, ...uList]);
      setFilteredUseds((prevUsed) => [...prevUsed, ...uList]);
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
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting){
        setPage((prev) => ({ ...prev, pageNum:prev.pageNum + 1 }));
      }
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, []);

  // 검색 핸들러
  const handleSearch = () => {
    if (!searchCategory || !searchTerm) {
      setFilteredUseds(useds);
      return;
    }

    const filteredUseds = useds.filter((item) => {
      if (searchCategory === "상품코드") {
        return item.usedCode.toString().includes(searchTerm);
      } else if (searchCategory === "상품명") {
        return item.usedName.includes(searchTerm);
      } else if (searchCategory === "가격") {
        return item.usedSeller.toString().includes(searchTerm);
      }
      return false;
    });

    setFilteredUseds(filteredUseds);
  };
  
  // 장바구니에 상품을 추가하는 함수
  const cartList = (uc, quantity) => {
    console.log(uc);
    const nid = sessionStorage.getItem("nid");
    let conf = window.confirm("장바구니에 추가할까요?");
    if (!conf) {
      return;
    }

    axios
      .get("/setusedcart", {
        params: { cnid: nid, usedCode: uc, quantity },
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

  const handleClick = () => {
    alert("구매페이지로 이동합니다")
    nav("/widgetcheckout");//, { state: { data:usedProductData } }
  };

  
  return (
    <div className="usedproduct-list">
      <h2 className="upsection-title">
        <span>중고</span>상품
      </h2>
      <div className="upproduct-grid">
          {/* <input
          className="upform-control"
          type="text"
          placeholder="Search for..."
          aria-label="Search for..."
          aria-describedby="btnNavbarSearch"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          name="upsearch"
          />
          <button
          className="btn upbtn-primary"
          id="upbtnNavbarSearch"
          onClick={handleSearch}
          >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button> */}

        {useds.map((item, index) => {
          return (
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
          );
        })}
      </div>
      {hasNextPage && (
        <div ref={observerRef} className="uploading-indicator">
          더 많은 상품 불러오는 중...
        </div>
      )}
    </div>
  );
};

export default UsedProduct;