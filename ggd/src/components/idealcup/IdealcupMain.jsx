import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import Button from "./Button";

import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import Paging from "./Paging";

import noimage from "../images/no-image.jpg";

import {
  faHeart,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const df = (date) => moment(date).format("YYYY-MM-DD HH:mm:ss");

const IdealcupMain = () => {
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
  console.log("페이지",page);
  console.log("게임",games);
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
        .get("/list", { params: { pageNum: inpage.pageNum } })
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

  // const [bitem, setBitem] = useState({}); //빈 객체로 초기화(한 게시글 정보를 저장)

  // //서버로부터 게시글 목록을 가져오는 함수
  // const getList = (page) => {
  //   // const paramData = {
  //   //   column: ps.searchColumn,
  //   //   keyword: ps.searchKeyword,
  //   // };
  //   // .get("/list", { params: { ...paramData, pageNum: page } })
  //   axios
  //     .get("/list", { params: { pageNum: page } })
  //     .then((res) => {
  //       const { bList, totalPage, pageNum } = res.data;
  //       setPage({ totalPage: totalPage, pageNum: pageNum });
  //       setBitem(bList);
  //       // ps.setPageNum(pageNum);
  //     })
  //     .catch((err) => console.log(err));
  // };

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

  //출력할 게시글 목록 작성
  let list = null;
  if (games.length === 0) {
    list = (
      <TableRow key={0}>
        <TableColumn span={4}>게시글이 없습니다.</TableColumn>
      </TableRow>
    );
  } else {
    list = Object.values(games).map((item) => (
      <TableRow key={item.iwcCode}>
        <TableColumn wd="w-10">{item.iwcCode}</TableColumn>
        <TableColumn wd="w-40">
          <div onClick={() => getBoard(item.iwcCode)}>{item.iwcName}</div>
        </TableColumn>
        <TableColumn wd="w-20">{item.iwcAuthor}</TableColumn>
        <TableColumn wd="w-30">{df(item.iwcDate)}</TableColumn>
      </TableRow>
    ));
  }

  const getBoard = (code) => {
    nav("/game", { state: { iwcCode: code } }); //'/board?bn=1'
  }; //상세보기 화면으로 전환될 때 게시글 번호를 보낸다.

  return (
    <div className="body">
      {/* <GameViewLayout hName={["NO", "Title", "Writer", "Date"]}>
        {list}
      </GameViewLayout> */}
      <div className="product-grid">
        {games.map((item, index) => (
          <div key={index} className="product-card">
            <div className="vs-imgset">
              <img
                src={noimage}
                alt={`상품 이미지 ${item.iwcCode}`}
                className="product-image"
              />
              <img
                src={noimage}
                alt={`상품 이미지 ${item.iwcCode}`}
                className="product-image"
              />
            </div>

            <div className="product-title">
              <div>{item.iwcName}</div>
              <div className="title-btn">
                <div>
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                <div>
                  <FontAwesomeIcon icon={faCircleExclamation} />
                </div>
              </div>
            </div>

            <p className="product-body">{item.iwcExplanation}</p>
            <p className="product-sub">{item.iwcAuthor}</p>
            <p className="product-body">{df(item.iwcDate)}</p>
            <div className="btn-set">
              {/* <button>시작</button>
              <button>랭킹</button>
              <button>공유</button> */}

              <Button size="s-25">시작</Button>
              <Button size="s-25">랭킹</Button>
              <Button size="s-25">공유</Button>
            </div>
          </div>
        ))}
      </div>
      {hasNextPage && (
        <h1 ref={observerRef} className="loading-indicator">
          이상형 월드컵 불러오는 중...
        </h1>
      )}
      이상형월드컵
      <Link to="/game">게임하러가기</Link>
    </div>
  );
};

export default IdealcupMain;
