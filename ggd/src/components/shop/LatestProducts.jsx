import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../idealcup/Button";
import "./scss/ShoppingMall.scss";

const LatestProducts = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState({
    //페이징 관련 정보 저장 state
    totalPage: 0,
    pageNum: 1,
  });
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageParams, setPageParams] = useState([]);
  const observerRef = useRef();
  // const mid = sessionStorage.getItem("mid");
  const mid = "asd"; //로그인 구현 전 임시
  const nav = useNavigate();
  console.log("페이지", page);
  console.log("게임", games);
  const fetchGoods = async (inpage) => {
    //중복호출 제거
    if (pageParams.includes(inpage.pageNum)) return;
    setLoading(true);
    try {
      // const paramData = {
      //   column: ps.searchColumn,
      //   keyword: ps.searchKeyword,
      // };
      // .get("/list", { params: { ...paramData, pageNum: page } })

      axios
        .get("/bpdList", { params: { pageNum: inpage.pageNum } })
        .then((res) => {
          const { bList, totalPage, pageNum } = res.data;
          setPage({ totalPage: totalPage, pageNum: pageNum });
          setGames((preGames) => [...preGames, ...bList]);
          // ps.setPageNum(pageNum);
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

  // const ps = useContext(PageContextStore);
  //console.log(ps);

  const options = [
    { value: "iwcName", label: "제목" },
    { value: "iwcExplanation", label: "내용" },
  ];

  useEffect(() => {
    fetchGoods(page);
  }, [page]);

  // useEffect(() => {

  //   // fetchGoods(page);
  //   // ps.pageNum !== null ? getList(ps.pageNum) : getList(1);
  //   // getList(1);
  // }, []);

  useEffect(() => {
    if (mid === null) {
      nav("/", { replace: true });

      return; //로그인 안한 경우 첫 화면으로 이동.
    }
    // if (page.pageNum == 1) {
    //   fetchGoods(page);
    // }
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      // if (page.pageNum == 1) return;
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
      if (observerRef.current) observer.unserve(observerRef.current);
    };
  }, []);

  const getBoard = (code) => {
    nav("/game", { state: { iwcCode: code } }); //'/board?bn=1'
  }; //상세보기 화면으로 전환될 때 게시글 번호를 보낸다.
  return (
    <div className="showcase">
      {/* <GameViewLayout hName={["NO", "Title", "Writer", "Date"]}>
        {list}
      </GameViewLayout> */}
      <div className="product-grid">
        {games.map((item, index) => (
          <div key={index} className="product-card">
            <div className="vs-imgset">
              <img
                src={`upload/${item.bprsysname}`}
                alt={`상품 이미지 ${item.bpnum}`}
                className="product-image"
              />
            </div>

            <div className="product-title">
              <Link
                to="/game"
                state={
                  {
                    //   code: item.iwcCode,
                    //   name: item.iwcName,
                    //   expl: item.iwcExplanation,
                  }
                }
              >
                <div>{item.iwcName}</div>
              </Link>
              <div className="title-btn">
                <div></div>
                <div></div>
                <div>{item.iwcViews}</div>
              </div>
            </div>

            <p className="product-body">{item.bpprice}</p>
            <p className="product-sub">{item.bpname}</p>
            <p className="product-sub">{item.bpexplanation}</p>
            <p className="product-body">{df(item.bpdate)}</p>
            <div className="btn-set">
              {/* <button>시작</button>
              <button>랭킹</button>
              <button>공유</button> */}
              <Link
                to={`/game?${item.bpnum}`}
                state={
                  {
                    //   code: item.iwcCode,
                    //   name: item.iwcName,
                    //   expl: item.iwcExplanation,
                  }
                }
              >
                <Button wsize="s-25">시작</Button>
              </Link>
              <Link>
                <Button wsize="s-25">랭킹</Button>
              </Link>
              <Link>
                <Button wsize="s-25">공유</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {hasNextPage && (
        <h1 ref={observerRef} className="loading-indicator">
          이상형 월드컵 불러오는 중...
        </h1>
      )}
    </div>
  );
};
const df = (date) => moment(date).format("YYYY-MM-DD");

export default LatestProducts;
