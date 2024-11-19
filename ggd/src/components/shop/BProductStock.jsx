import React, { useEffect, useState } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BproductStockTable from "./BproductStockTable";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import "./scss/BProductStock.scss";
import Paging from "./Paging";

const bn = (Number) => Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const BProductStock = () => {
  const nav = useNavigate();

  const id = sessionStorage.getItem("bid");
  const bsellerId = sessionStorage.getItem("nnickname");
  const pageNum = sessionStorage.getItem("pageNum");

  //임시 테스트용
  let testnum = 245;

  const [bbitem, setBbitem] = useState([]);

  // 검색 필터링된 아이템
  const [filteredItems, setFilteredItems] = useState([]);

  // 검색 상태 추가
  const [searchCategory, setSearchCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [stockdata, setStockdata] = useState({
    bprobid: id,
    bsellerId: bsellerId,
    bpwarestock: "",
    bpwarestocklimt: "",
  });

  const [page, setPage] = useState({
    //페이징 관련 정보 저장
    totalPage: 0,
    pageNum: 1,
  });

  //서버로부터 등록한 상품 불러오는 함수
  const getBproduct = (pnum) => {
    axios
      .get("/BproductList", {
        params: { pageNum: pnum, bsellerId: bsellerId },
      })
      .then((res) => {
        console.log(res.data);

        const { bList, totalPage, pageNum } = res.data;
        // console.log(totalPage);
        setPage({ totalPage: totalPage, pageNum: pageNum });
        // console.log(page);
        let newBlist = [];
        for (let bItem of bList) {
          newBlist.push({ ...bItem });
        }
        setBbitem(newBlist);
        // 초기 필터링 상태는 전체 리스트
        setFilteredItems(newBlist);
        sessionStorage.getItem("pageNum", pageNum);
      })
      .catch((err) => console.log(err));
  };

  // 검색 핸들러
  const handleSearch = () => {
    console.log("검색 기준:", searchCategory);
    console.log("검색어:", searchTerm);

    if (!searchCategory || !searchTerm) {
      // 검색 기준이나 검색어가 없을 경우 원래의 리스트를 보여줌
      setFilteredItems(bbitem);
      return;
    }

    const filteredList = bbitem.filter((item) => {
      if (searchCategory === "상품명") {
        return item.bpname.includes(searchTerm);
      } else if (searchCategory === "상품코드") {
        return item.bpnum.toString().includes(searchTerm);
      } else if (searchCategory === "상태") {
        return item.bcondition.includes(searchTerm);
      }
      return false;
    });
    console.log("필터링 된 리스트 :", filteredList);
    setFilteredItems(filteredList);
  };

  //BProductStock 컴포넌트가 화면에 보일때 서버로 부터 등록상품 목록을 가져오기
  useEffect(() => {
    // console.log(id);
    if (id === null) {
      nav("/", { replace: true });
      return;
    }
    pageNum !== null ? getBproduct(pageNum) : getBproduct(1);
  }, []);

  console.log(bbitem);

  //등록 상품 목록 작성
  let BproductList = null;
  if (filteredItems.length === 0) {
    BproductList = (
      <TableRow key={0}>
        <TableColumn span={4}>등록된 상품이 없습니다.</TableColumn>
      </TableRow>
    );
  } else {
    BproductList = Object.values(filteredItems).map((item) => (
      <TableRow key={item.bpnum}>
        <TableColumn wd={"w-30"}>{item.bpnum}</TableColumn>
        <TableColumn wd={"w-20"}>
          <div>
            <img
              onClick={() => getBboard(item.bpnum)}
              className="img"
              src={"../productupload/" + item.bproductFileSysnameM}
            />
            <div onClick={() => getBboard(item.bpnum)}>{item.bpname}</div>
          </div>
        </TableColumn>
        <TableColumn wd={"w-10"}>{bn(item.bpwarestock)}</TableColumn>
        <TableColumn wd={"w-10"}>{testnum}</TableColumn>
        <TableColumn wd={"w-30"}>{item.bcondition}</TableColumn>
      </TableRow>
    ));
  }
  const getBboard = (bpnum) => {
    nav("/bproductview", { state: { bpnum: bpnum } });
  };

  return (
    <div className="bproductstock" style={{ width: "90%" }}>
      <div className="Title">
        <h2>상품 재고관리</h2>
        <hr />
      </div>

      <div className="input-group">
        <select
          className="form-control"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          name="search"
        >
          <option value="">전체</option>
          <option value="상품명" name="상품명">
            상품명
          </option>
          <option value="상품코드" name="상품코드">
            상품코드
          </option>
          <option value="상태" name="상태">
            상태
          </option>
        </select>
        <input
          className="form-control"
          type="text"
          placeholder="Search for..."
          aria-label="Search for..."
          aria-describedby="btnNavbarSearch"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-primary"
          id="btnNavbarSearch"
          type="button"
          onClick={handleSearch}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        {/* <Button className="button">상품 옵션 관리</Button> */}
      </div>
      <div className="Table">
        <BproductStockTable
          hname={[
            "상품코드",
            "상품명",
            "창고재고",
            "주문대기",
            // "가재고",
            // "통보수량",
            // "재입고 알림",
            "상태",
          ]}
        >
          {BproductList}
        </BproductStockTable>
      </div>
      <div>
        <p>{}</p>
      </div>
      <Paging className="page" page={page} getList={getBproduct} />
    </div>
  );
};

export default BProductStock;
