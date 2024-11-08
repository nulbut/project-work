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

import noimage from "../images/no-image.jpg";

import {
  faHeart,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShareButton from "./ShareButton";
import "./scss/IdealcupMain.scss";
import { param } from "jquery";
import ReportModal from "./ReportModal";

const df = (date) => moment(date).format("YYYY-MM-DD");

const IdealcupMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItem, setModaItem] = useState({});
  const [games, setGames] = useState([]);
  const [page, setPage] = useState({
    //페이징 관련 정보 저장 state
    totalPage: 0,
    pageNum: 1,
  });
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageParams, setPageParams] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [timeRange, setTimeRange] = useState("entire"); // 월간, 주간, 일간
  const [sortBy, setSortBy] = useState("popularity"); // 조회순, 최신순, 인기순
  const observerRef = useRef();
  const nav = useNavigate();
  console.log(sessionStorage.getItem("nid"));
  const fetchGoods = async (inpage) => {
    //중복호출 제거
    if (pageParams.includes(inpage.pageNum)) return;
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
        .get("/list", { params: paramData })
        .then((res) => {
          const { bList, totalPage, pageNum } = res.data;
          setPage({ totalPage: totalPage, pageNum: pageNum });
          setGames((preGames) => [...preGames, ...bList]);
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
    console.log("useEffect triggered", page, timeRange, sortBy, searchKeyword);
    fetchGoods(page);
  }, [page, timeRange, sortBy]);

  useEffect(() => {
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
      if (observerRef.current) observer.unserve(observerRef.current);
    };
  }, []);

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

  // 모달 열기
  const openModal = (nid, code, where, name) => {
    if (sessionStorage.getItem("nid") == null) {
      alert("로그인 후 신고하실 수 있습니다.");
      return;
    }
    setModaItem({ id: nid, code: code, where: where, name: name });
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = (reason, description) => {
    reason("");
    description("");
    setIsModalOpen(false);
  };

  // 신고 제출 처리
  const handleReportSubmit = (reason, description) => {
    console.log("신고 제출:", reason, description);
    // 서버로 신고 데이터를 보낼 수 있습니다.
  };
  return (
    <div className="idealmain">
      <ReportModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleReportSubmit}
        item={modalItem}
      />
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

      {/* 게임 목록 */}
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
              {df(item.iwcDate)}{" "}
              <h3>
                <div
                  onClick={() =>
                    handleLikeClick(item.iwcCode, item.iwcLike, item.liked)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{
                      color: item.liked ? "red" : "gray", // 좋아요 상태에 따라 색상 변경
                    }}
                  />
                  {item.iwcLike}
                </div>
                <div
                  onClick={() =>
                    openModal(
                      sessionStorage.getItem("nid"),
                      item.iwcCode,
                      "이상형 월드컵",
                      item.iwcName
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon icon={faCircleExclamation} />
                </div>
              </h3>
            </p>
            <div className="btn-set">
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
              <ShareButton />
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

export default IdealcupMain;
