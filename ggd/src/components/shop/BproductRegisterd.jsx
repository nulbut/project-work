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

const bf = (date) => moment(date).format("YYYY-MM-DD");
const bn = (Number) => Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const BproductRegisterd = () => {
  const nav = useNavigate();

  //상품등록으로 이동하는 함수
  const bproductwirtego = () => {
    nav("/bproductw");
  };

  //상품수정으로 이동하는 함수
  const bproductupdatego = () => {
    nav("/bproductupdata");
  };

  const bsellerId = sessionStorage.getItem("nnickname");
  const [fileName, setFileName] = useState({
    bproductfilecode: "",
    bproductfilesysname: "",
  });
  console.log(fileName);
  const bbpNum = 1;
  const [bbitem, setitem] = useState([]);

  const [page, setpage] = useState({
    //페이징 관련 정보 저장
    totalpage: 0,
    pageNum: 1,
  });

  //서버로부터 등록한 상품 불러오는 함수
  const getBproduct = (pnum) => {
    axios
      .get("/BproductList", {
        params: { bpageNum: pnum, bsellerId: bsellerId },
      })
      .then((res) => {
        const { bList, totalPage, pageNum, bsellerId } = res.data;
        console.log(totalPage);
        setpage({ totalPage: totalPage, pageNum: pageNum });
        console.log(page);
        setitem(bList);
        console.log(bList);
        sessionStorage.getItem("pageNum", pageNum);
      })
      .catch((err) => console.log(err));
  };

  //BProductRegistered 컴포넌트가 화면에 보일 때 서버로부터 등록상품 목록을 가져옴
  useEffect(() => {
    console.log(bsellerId);
    if (bsellerId === null) {
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
    // if (fdata.length === 0) {
    //   BproductList = (
    //     <TableRow key={0}>
    //       <TableColumn span={3}>등록된 이미지가 없습니다.</TableColumn>
    //     </TableRow>
    //   );
    // }
  } else {
    BproductList = Object.values(bbitem).map((bbitem) => (
      <TableRow key={bbitem.bpnum}>
        <TableColumn wd={"w-10"}>
          <input className="Input" type="checkbox" />
        </TableColumn>
        <TableColumn wd={"w-10"}>{bbitem.bpnum}</TableColumn>
        <TableColumn wd={"w-10"}>{bbitem.bpnum}</TableColumn>
        <TableColumn wd={"w-10"}>
          <div onClick={() => getBboard(bbitem.bpname)}>{bbitem.bpname}</div>
        </TableColumn>
        <TableColumn wd={"w-10"}>{bn(bbitem.bpprice)}</TableColumn>
        <TableColumn wd={"w-20"}>{bbitem.bpwarestock}</TableColumn>
        <TableColumn wd={"w-10"}>
          <input className="Input" type="checkbox" />
        </TableColumn>
        <TableColumn wd={"w-10"}>
          <input className="Input" type="checkbox" />
        </TableColumn>
        <TableColumn wd={"w-10"}>{bf(bbitem.bpsigndt)}</TableColumn>
        <TableColumn wd={"w-30"}>
          <Button onClick={bproductupdatego}>상품수정</Button>
        </TableColumn>
      </TableRow>
    ));
  }
  const getBboard = (bpnum) => {
    nav("pdView", { state: { bpc: bpnum } });
  };

  return (
    <div style={{ width: "90%" }}>
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
            "상품코드",
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
        {/* <Paging page={page} getList={getBproduct} /> */}
      </div>
      <div>
        <Button onClick={bproductwirtego}>상품등록</Button>
        <Button>상품삭제</Button>
      </div>
    </div>
  );
};

export default BproductRegisterd;
