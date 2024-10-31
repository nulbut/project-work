import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import BproductTable from "./BproductTable";
import moment from "moment";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import Paging from "./Paging";

const BproductRegisterd = () => {
  const nav = useNavigate();

  //상품등록으로 이동하는 함수
  const bproductwirtego = () => {
    nav("/bproductw");
  };
  const bcname = sessionStorage.getItem("nnickname");
  const bbpNum = 1;
  const [bbitem, setBbitem] = useState([]);
  const [bpage, setBpage] = useState({
    //페이징 관련 정보 저장
    totalpage: 0,
    pageNum: 1,
  });

  //서버로부터 등록한 상품 불러오는 함수
  const getBproduct = (bbpNum) => {
    axios
      .get("/getBproduct", { params: { pageNum: bbpNum } })
      .then((res) => {
        const { bbList, btotalPage, pageNum } = res.data;
        setBpage({ btotalPage: btotalPage, pageNum: bbpNum });
        setBbitem(bbList);
        sessionStorage.getItem("pageNum", pageNum);
      })
      .catch((err) => console.log(err));
  };

  //BProductRegistered 컴포넌트가 화면에 보일 때 서버로부터 등록상품 목록을 가져옴
  useEffect(() => {
    // console.log(bcname);
    if (bcname === null) {
      nav("/", { replace: true });
      return;
    }
    bbpNum !== null ? getBproduct(bbpNum) : getBproduct(1);
  }, []);
  //등록상품 목록 작성
  let BproductList = null;
  if (bbitem.length === 0) {
    BproductList = (
      <TableRow key={0}>
        <TableColumn span={4}>등록된 상품이 없습니다.</TableColumn>
      </TableRow>
    );
  } else {
    BproductList = Object.values(bbitem).map((bbitem) => (
      <TableRow key={bbitem.bpnum}>
        <TableColumn wd={"w-10"}>{bbitem.bpnum}</TableColumn>
        <TableColumn wd={"w-40"}>
          <div onClick={() => getBboard(bbitem.bpnum)}>{bbitem.bpnum}</div>
        </TableColumn>
        <TableColumn wd={"w-20"}>{bbitem.bpname}</TableColumn>
        <TableColumn wd={"w-30"}>{bbitem.bpprice}</TableColumn>
        <TableColumn wd={"w-30"}>{bbitem.bpwarestock}</TableColumn>
        <TableColumn wd={"w-30"}>{bbitem.bpsigndt}</TableColumn>
      </TableRow>
    ));
  }
  const getBboard = (bpnum) => {
    nav("/", { state: { bpc: bpnum } });
  };

  return (
    <div>
      <h2>등록한 상품</h2>
      <hr />
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
        >
          {BproductList}
        </BproductTable>
      </div>
      {/* <Paging page={bpage} getList={getBproduct} /> */}
      <div>
        <Button onClick={bproductwirtego}>상품등록</Button>
        <Button>상품삭제</Button>
      </div>
    </div>
  );
};

export default BproductRegisterd;
