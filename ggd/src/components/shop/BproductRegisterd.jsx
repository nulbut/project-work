import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import BproductTable from "./BproductTable";
import moment from "moment";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const bf = (data) => moment(data).format("YYYY-MM-DD");

const BproductRegisterd = () => {
  const nav = useNavigate();

  const bproductwirtego = () => {
    nav("/bproductw");
  };
  return (
    <div>
      <h2>등록한 상품</h2>
      <div>
        <select>
          <option>전체분류</option>
          <option>상품코드</option>
          <option>상품명</option>
          <option>가격</option>
        </select>
      </div>
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          placeholder="Search for..."
          aria-label="Search for..."
          aria-describedby="btnNavbarSearch"
        />
        <button className="btn btn-primary" id="btnNavbarSearch" type="button">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div>
        <BproductTable
          hname={[
            "",
            "분류",
            "상품코드,",
            "이미지",
            "상품명",
            "가격",
            "재고",
            "판매",
            "품절",
            "조회",
            "등록일",
            "관리",
          ]}
        ></BproductTable>
      </div>
      <div>
        <Button onClick={bproductwirtego}>상품등록</Button>
        <Button>상품삭제</Button>
      </div>
    </div>
  );
};

export default BproductRegisterd;
