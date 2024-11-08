import React from "react";
import Button from "./Button";
import "./scss/BOderhistory.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Radio from "./Radio";

const BOderHistory = () => {
  return (
    <div className="main">
      <div className="title">
        <h4>주문목록 / 배송조회 내역 총 {} 건</h4>
      </div>
      <div className="oderhistorysearch">
        <div className="oderhistorysearchtitle">
          <p>주문내역 / 배송조회</p>
        </div>
        <div className="searchbox">
          <p>주문일자</p>
          <Button>오늘</Button>
          <Button>7일</Button>
          <Button>1개월</Button>
          <Button>3개월</Button>
          <Button>1년</Button>
          <div>
            <input type="date" />
            -
            <input type="date" />`
          </div>
          <Button>조회</Button>
          {/* 내가 조회버튼 만들어서 아이콘식으로 넣어도될듯? */}
        </div>
        <div className="selectsearch">
          <select name="" id="">
            <option>분류</option>
            <option>주문번호</option>
            <option>주문상품명</option>
            <option>주문자</option>
            <option>주문자ID</option>
          </select>
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Search for..."
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
          </div>
          <div className="radioshi">
            <div>
              <p>주문상태</p>
              <div>
                <Radio name="content" value="text">
                  전체선택
                </Radio>
                <Radio name="content" value="text">
                  주문
                </Radio>
                <Radio name="content" value="text">
                  입금
                </Radio>
                <Radio name="content" value="text">
                  준비
                </Radio>
                <Radio name="content" value="text">
                  배송
                </Radio>
                <Radio name="content" value="text">
                  완료
                </Radio>
                <Radio name="content" value="text">
                  전체취소
                </Radio>
                <Radio name="content" value="text">
                  일부취소
                </Radio>
              </div>
              <div>
                <p>결제수단</p>
                <Radio name="content" value="text">
                  전체
                </Radio>
                <Radio name="content" value="text">
                  간편결제
                </Radio>
                <Radio name="content" value="text">
                  신용/체크카드
                </Radio>
              </div>
              <div>
                <p>기타선택</p>
                <Radio name="content" value="text">
                  전체
                </Radio>
                <Radio name="content" value="text">
                  반품
                </Radio>
                <Radio name="content" value="text">
                  환불
                </Radio>
                <Radio name="content" value="text">
                  포인트 주문
                </Radio>
              </div>
            </div>
            <div className="table">{/* 테이블 들어갈 자리 */}</div>
            <div className="oderchage">
              <p>주문상태변경</p>
              <Radio name="content" value="text">
                준비
              </Radio>
              <Radio name="content" value="text">
                배송
              </Radio>
              <Radio name="content" value="text">
                완료
              </Radio>
              <Radio name="content" value="text">
                전체취소
              </Radio>
              <Radio name="content" value="text">
                일부취소
              </Radio>
            </div>
            <div className="chagebutton">
              <Button>상태 수정</Button>
              <Button>배송지 등록</Button>
              <Button>배송지 수정</Button>
            </div>
            <div>{/* 페이지 들어갈것임 */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BOderHistory;
