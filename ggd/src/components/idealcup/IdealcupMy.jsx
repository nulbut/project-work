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
import ShareButton from "./ShareButton";

const df = (date) => moment(date).format("YYYY-MM-DD HH:mm:ss");

const IdealcupMy = () => {
  const id = sessionStorage.getItem("nid");
  const [games, setGames] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [timeRange, setTimeRange] = useState("entire"); // 월간, 주간, 일간
  const [sortBy, setSortBy] = useState("popularity"); // 조회순, 최신순, 인기순
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
    if (pageParams.includes(inpage.pageNum) || id == null) return;
    setLoading(true);
    try {
      const paramData = {
        pageNum: inpage.pageNum,
        searchKeyword: searchKeyword,
        timeRange: timeRange,
        sortBy: sortBy,
        nid: sessionStorage.getItem("nid"),
      };
      axios
        .get("/myGameList", { params: paramData })
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

  useEffect(() => {
    fetchGoods(page);
  }, [page, timeRange, sortBy]);

  useEffect(() => {
    if (id === null) {
      nav("/login", { replace: true });

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

  const getUpdateBoard = (item, e) => {
    e.preventDefault();
    nav("/make", { state: { iwcInfo: item } }); //'/board?bn=1'
  }; //상세보기 화면으로 전환될 때 게시글 번호를 보낸다.

  const deleteBoard = useCallback(
    (item, index) => {
      let conf = window.confirm("삭제하시겠습니까?");
      if (!conf) {
        //취소 버튼이 눌리면 삭제 종료
        return;
      }

      axios
        .post("/deleteCup", null, { params: { iwccode: item.iwcCode } })
        .then((res) => {
          if (res.data.res === "ok") {
            alert("삭제 완료");
            games.splice(index, 1);
            setGames([...games]);
          } else {
            alert("삭제 실패");
          }
        })
        .catch((err) => console.log(err));
    },
    [games]
  );
  // 검색어 입력 핸들러
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  }; //onch는 문제가 있어보임

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    setGames([]); // 게임 목록 초기화
    setPageParams([]); // 페이지 파라미터 초기화
    setPage((prev) => ({ ...prev, pageNum: 1 })); // 페이지를 첫 번째 페이지로 리셋
  }, []);

  // 정렬 기준 변경 핸들러
  const handleSortChange = (value) => {
    setGames([]);
    setPageParams([]);
    setSortBy(value);
    setPage((prev) => ({ ...prev, pageNum: 1 }));
  };

  // 시간 범위 변경 핸들러
  const handleTimeRangeChange = (value) => {
    setGames([]);
    setPageParams([]);
    setTimeRange(value);
    setPage((prev) => ({ ...prev, pageNum: 1 }));
  };
  console.log(sortBy, timeRange, searchKeyword);
  console.log(games);

  const handleLikeClick = async (gameId, currentLikes, isLiked) => {
    try {
      axios
        .post("/likeClicked", {
          iwcCode: gameId,
          likeNid: sessionStorage.getItem("nid"),
          liked: isLiked, // 현재 상태
        })
        .then((res) => {
          if (res.status === 200) {
            // 클라이언트에서 바로 UI 반영
            setGames((prevGames) =>
              prevGames.map((game) =>
                game.iwcCode === gameId
                  ? {
                      ...game,
                      iwcLike: isLiked ? currentLikes - 1 : currentLikes + 1, // 좋아요 수 증가/감소
                      liked: !isLiked, // 좋아요 상태 토글
                    }
                  : game
              )
            );
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error updating like", error);
    }
  };
  return (
    <div className="idealmain">
      {/* <GameViewLayout hName={["NO", "Title", "Writer", "Date"]}>
        {list}
      </GameViewLayout> */}
      <div className="search-filter-container">
        {/* 필터 버튼들 */}
        <div className="filter-buttons">
          <div className="sort-filters">
            <button
              className={sortBy === "popularity" ? "active" : ""}
              onClick={() => handleSortChange("popularity")}
            >
              인기순
            </button>
            <button
              className={sortBy === "views" ? "active" : ""}
              onClick={() => handleSortChange("views")}
            >
              조회순
            </button>
            <button
              className={sortBy === "new" ? "active" : ""}
              onClick={() => handleSortChange("new")}
            >
              최신순
            </button>
          </div>
          <div className="time-filters">
            <button
              className={timeRange === "entire" ? "active" : ""}
              onClick={() => handleTimeRangeChange("entire")}
            >
              전체
            </button>
            <button
              className={timeRange === "monthly" ? "active" : ""}
              onClick={() => handleTimeRangeChange("monthly")}
            >
              월간
            </button>
            <button
              className={timeRange === "weekly" ? "active" : ""}
              onClick={() => handleTimeRangeChange("weekly")}
            >
              주간
            </button>
            <button
              className={timeRange === "daily" ? "active" : ""}
              onClick={() => handleTimeRangeChange("daily")}
            >
              일간
            </button>
          </div>
        </div>
        <div>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="월드컵 제목 또는 월드컵 설명으로 검색하세요"
              value={searchKeyword}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button type="submit" className="search-button">
              검색
            </button>
          </form>
        </div>
      </div>
      <div className="product-grid">
        {games.map((item, index) => (
          <div key={index} className="product-card">
            <div className="vs-imgset">
              <div>
                <img
                  src={`upload/${item.iwcFirstImage}`}
                  alt={`상품 이미지 ${item.iwcCode}`}
                  className="product-image"
                />
                {item.iwcFirstName}
              </div>
              <div>
                <img
                  src={`upload/${item.iwcSecondImage}`}
                  alt={`상품 이미지 ${item.iwcCode}`}
                  className="product-image"
                />
                {item.iwcSecondName}
              </div>
            </div>

            <div className="product-title">
              <Link
                to="/game"
                state={{
                  code: item.iwcCode,
                  name: item.iwcName,
                  expl: item.iwcExplanation,
                }}
              >
                <div>{item.iwcName}</div>
              </Link>
              <div className="title-btn">
                <div>조회수 : {item.iwcViews}</div>
              </div>
            </div>

            <p className="product-body">{item.iwcExplanation}</p>
            <p className="product-sub">{item.iwcAuthor}</p>
            <p className="product-body">
              {df(item.iwcDate)}
              <h3>
                <div>
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                <div>
                  <FontAwesomeIcon icon={faCircleExclamation} />
                </div>
              </h3>
            </p>
            <div className="btn-set">
              {/* <button>시작</button>
              <button>랭킹</button>
              <button>공유</button> */}
              <Link
                to={`/game`}
                state={{
                  code: item.iwcCode,
                  name: item.iwcName,
                  expl: item.iwcExplanation,
                }}
              >
                <Button wsize="s-25">시작</Button>
              </Link>
              <Link>
                <Button wsize="s-25">랭킹</Button>
              </Link>
              <ShareButton
                code={item.iwcCode}
                name={item.iwcName}
                expl={item.iwcExplanation}
              />
              <div />
              <Link>
                <Button
                  wsize="s-25"
                  outline
                  onClick={(e) => getUpdateBoard(item, e)}
                >
                  수정
                </Button>
              </Link>
              <Link>
                <Button
                  wsize="s-25"
                  outline
                  onClick={(e) => deleteBoard(item, index)}
                >
                  삭제
                </Button>
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

export default IdealcupMy;
