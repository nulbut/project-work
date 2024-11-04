import React, { useEffect, useRef, useState } from "react";
import "./scss/InfiniteScroll.scss";
import axios from "axios";
import moment from "moment";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import Button from "./Button";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

const df = (date) => moment(date).format("YYYY-MM-DD");

const UsedProduct = () => {
  const [useds, setUsed] = useState([]);
  const [page, setPage] = useState({
    //페이징 관련 정보 저장
    totalPage: 0,
    pageNum: 1,
  });
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageParams, setPageParams] = useState([]);
  const observerRef = useRef();

  const usedsellerId = "nid"
  const nav = useNavigate();
  console.log("페이지", page);
  console.log("중고상품", useds);
  const fetchUseds = async (inpage) => {
    //중복 호출 제거
    if (pageParams.includes(inpage.pageNum)) return;
    setLoading(true);
    try{
      axios
      .get("usedList", { params: { pageNum: inpage.pageNum } })
      .then((res) => {
        const { uList, totalPage, pageNum } = res.data;
        setPage({ totalPage: totalPage, pageNum:pageNum });
        setUsed((preUsed) => [...preUsed, ...uList]);
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
    { value: "usedName", label: "중고상품이름"},
    { value: "usedDetail", label: "상품내용"},
  ];

  useEffect(() => {
    fetchUseds(page);
  }, [page]);

  useEffect(() => {
    if (usedsellerId === null) {
      nav("/", { replace:true });

      return; //로그인 안했을 경우 첫 화면 이동
    }

    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];

      if (firstEntry.isIntersecting) {
        setPage((prev) => {
          return{
            ...prev,
            pageNum:prev.pageNum + 1,
          };
        });
        console.log("옵저버", page);
      } else{
        console.log("출력안됨");
      }
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, []);

  //출력하는 중고 목록
  let list = null
  if (useds.length === 0){
    list = (
      <TableRow key={0}>
        <TableColumn span={4}>등록된 중고 상품이 없습니다.</TableColumn>
      </TableRow>
    );
  } else {
    list = Object.values(useds).map((item) => (
      <TableRow key={item.usedCode}>
        <TableColumn wd="w-10">{item.usedCode}</TableColumn>
        <TableColumn wd="w-40">
          <div onClick={() => getusedBoard(item.usedCode)}>
            {item.usedName}
          </div>
        </TableColumn>
        <TableColumn wd="w-20">{item.usedsellerId}</TableColumn>
        <TableColumn wd="w-30">{df(item.usedDate)}</TableColumn>
      </TableRow>
    ));
  }
  
  const getusedBoard = (code) => {
    nav("/pddetails", { state: { usedCode: code } });
  };
  
  return (
    <div className="product-list">
      <h2 className="section-title">
        중고상품
      </h2>
      <div className="product-grid">
        {useds.map((item, index) => (
          <div key={index} className="product-card">
            <div className="product-image-placeholder">
              <img
                src={`usupload/${item.usedFileSysname}`}
                alt={`상품 이미지${item.usedCode}`}
                className="product-image"
              />
            </div>
            <h3 className="product-title">상품명 : {item.usedName}</h3>
            <p className="product-price">₩{item.usedSeller}</p>
            <p className="product-body">{item.usedDetail}</p>
            <div className="btn-set">
              <Link>
                <Button wsize="s-25">구매하기</Button>
              </Link>
              <Link
              to={`/pddetails?${item.usedCode}`}
              state={{
                code: item.usedCode,
                name: item.usedName,
                sellerId:item.usedsellerId,
                detail: item.usedDetail,
                seller: item.usedSeller,
                imageNum: item.usedFileSysname,
              }}
              >
                <Button wsize="s-25">제품 상세</Button>
              </Link>
              <Link>
                <Button wsize="s-25">장바구니</Button>
              </Link>
            </div>
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

export default UsedProduct;
