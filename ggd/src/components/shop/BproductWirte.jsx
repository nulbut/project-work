import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import toggleoff from "../images/toggleoff.png";
import toggleon from "../images/toggleon.png";

const BproductWirte = () => {
  //토글용 state (on,off)
  const [isOpen, setIsOpen] = useState(true);

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <h3>상품등록</h3>
      <hr />

      <div>
        <p className="title">카테고리</p>
        <p>대분류</p>
        <div>
          {/* <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="대분류 검색"
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
            />
            <button
              className="btn btn-primary"
              id="btnNavbarSearch"
              type="button"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div> */}
          <input type="text" />
        </div>
        <p>중분류</p>
        <div>
          {/* <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="중분류 검색"
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
            />
            <button
              className="btn btn-primary"
              id="btnNavbarSearch"
              type="button"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div> */}
          <input type="text" />
        </div>
        <p>소분류</p>
        <div>
          {/* <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="소분류 검색"
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
            />
            <button
              className="btn btn-primary"
              id="btnNavbarSearch"
              type="button"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div> */}
          <input type="text" />
        </div>
      </div>
      <div>
        <p className="title">상품정보</p>
        <p>상품 대표 이미지</p>
        <label className="FileLabel" htmlFor="upload">
          파일 선택
        </label>
        <span className="FileSpan">{/* {fileName} */}</span>
        <p>미리보기들어갈것</p>
        <p>제품명</p>
        <input type="text" />
        <p>판매가격</p>
        <input type="text" />
        <p>구매제한</p>
        <input type="text" />
        <p>창고재고</p>
        <input type="text" />
        <p>출시일</p>
        <input type="date" />
        <p>상품 이미지</p>
        <label className="FileLabel" htmlFor="upload">
          업로드
        </label>
        <span className="FileSpan">{/* {fileName} */}</span>
        <p>미리보기들어갈것 </p>
      </div>
      <div>
        <p className="title">상품상세정보</p>
        <p>상품 상세 설명</p>
        <input type="text" />
      </div>
      <div>
        <p className="title">옵션사용</p>
        <p>상품 옵션</p>
        <div className="onoff">
          {isOpen ? (
            <img src={toggleon} onClick={toggleHandler} />
          ) : (
            <img src={toggleoff} onClick={toggleHandler} />
          )}
        </div>
      </div>
      <div>
        <p className="title">사양</p>
        <p>사이즈</p>
        <input type="text" />
        <p>재질</p>
        <input type="text" />
      </div>
    </div>
  );
};
export default BproductWirte;
