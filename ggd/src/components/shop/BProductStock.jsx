import React, { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BproductStockTable from "./BproductStockTable";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import { data } from "jquery";

const bn = (Number) => Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const BProductStock = () => {
  const nav = useNavigate();

  const id = sessionStorage.getItem("bid");
  const bsellerId = sessionStorage.getItem("nnickname");
  const bbpNum = 1;

  const [bbitem, setBbitem] = useState([]);

  const [stockdata, setStockdata] = useState({
    bprobid: id,
    bsellerId: bsellerId,
    bpwarestock: "",
    bpwarestocklimt: "",
  });

  const { bpwarestock, bpwarestocklimt } = stockdata;

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
        console.log(res.data);

        const { bList, totalPage, pageNum } = res.data;
        // console.log(totalPage);
        setpage({ totalpage: totalPage, pageNum: pageNum });
        // console.log(page);
        let newBlist = [];
        for (let bItem of bList) {
          newBlist.push({ ...bItem, checked: false });
        }
        setBbitem(newBlist);
        sessionStorage.getItem("pageNum", pageNum);
      })
      .catch((err) => console.log(err));
  };

  //BProductStock 컴포넌트가 화면에 보일때 서버로 부터 등록상품 목록을 가져오기
  useEffect(() => {
    console.log(id);
    if (id === null) {
      nav("/", { replace: true });
      return;
    }
    bbpNum !== null ? getBproduct(bbpNum) : getBproduct(1);
  }, []);

  //등록 상품 목록 작성
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
        <TableColumn wd={"w-30"}>
          <div>
            <img
              className="img"
              src={"../productupload/" + bbitem.bproductFileSysnameM}
            />
            <div onClick={() => getBboard(bbitem.bpnum)}>{bbitem.bpname}</div>
          </div>
        </TableColumn>
        <TableColumn wd={"w-10"}>{bn(bbitem.bpwarestock)}</TableColumn>
        <TableColumn wd={"w-10"}>주문재고 불러올 예정</TableColumn>
        <TableColumn wd={"w-10"}>가재고 불러올 예정</TableColumn>
        <TableColumn wd={"w-10"}>{bbitem.bpwarestocklimt}</TableColumn>
        <TableColumn wd={"w-10"}></TableColumn>
      </TableRow>
    ));
  }
  const getBboard = (bpnum) => {
    nav("/bproductview", { state: { bpnum: bpnum } });
  };

  return (
    <div>
      <div className="Title">
        <h3>상품 재고관리</h3>
        <hr />
      </div>
      <div className="Titlesv">
        <select>
          <option>상품명</option>
          <option>상품코드</option>
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
        <Button>상품 옵션 관리</Button>
      </div>
      <div className="Table">
        <BproductStockTable
          hname={[
            "상품코드",
            "상품명",
            "창고재고",
            "주문대기",
            "가재고",
            "통보수량",
            "상태",
          ]}
        >
          {BproductList}
        </BproductStockTable>
      </div>
      {/* <Paging page={page} getList={getBproduct} /> */}
    </div>
  );
};

export default BProductStock;
