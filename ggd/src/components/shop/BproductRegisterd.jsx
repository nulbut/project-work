import { faL, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
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
import "./scss/BproductRegisterd.scss";
import CheckBox from "./checkbox/CheckBox";

const bf = (date) => moment(date).format("YYYY-MM-DD");
const bn = (Number) => Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const BproductRegisterd = () => {
  const nav = useNavigate();

  //상품등록으로 이동하는 함수
  const bproductwirtego = () => {
    nav("/bproductw");
  };
  const id = window.sessionStorage.getItem("bid");
  const bsellerId = sessionStorage.getItem("nnickname");
  const pageNum = sessionStorage.getItem("pageNum");

  console.log(id);

  const [bbitem, setBbitem] = useState([]);
  // 검색 필터링된 아이템
  const [filteredItems, setFilteredItems] = useState([]);

  const [page, setPage] = useState({
    //페이징 관련 정보 저장
    totalPage: 0,
    pageNum: 1,
  });

  // 검색 상태 추가
  const [searchCategory, setSearchCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
          newBlist.push({ ...bItem, checked: false });
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
      if (searchCategory === "상품코드") {
        return item.bpnum.toString().includes(searchTerm);
      } else if (searchCategory === "상품명") {
        return item.bpname.includes(searchTerm);
      } else if (searchCategory === "가격") {
        return item.bpprice.toString().includes(searchTerm);
      }
      return false;
    });
    console.log("필터링 된 리스트 :", filteredList);
    setFilteredItems(filteredList);
  };

  //일괄체크 함수
  const allCheckedHandler = (e) => {
    let tempList = [];
    for (let bi of bbitem) {
      bi.checked = e.target.checked;

      tempList.push(bi);
    }
    console.log(tempList);
    setBbitem(tempList);
  };

  //개별체크 함수
  const checkItemHandler = (id, isChecked) => {
    console.log(isChecked);
    let tempList = [];
    for (let bi of bbitem) {
      if (bi.bpnum == id) {
        bi.checked = isChecked;
      }
      tempList.push(bi);
    }
    setBbitem(tempList);
    console.log(tempList);
  };

  //체크한 상품 삭제 함수
  const checkDelete = () => {
    let conf = window.confirm("삭제하시겠습니까?");
    if (!conf) {
      //취소 버튼 눌리면 삭제 종료
      return;
    }
    let checkItems = [];
    for (let bitem of bbitem) {
      if (bitem.checked) {
        checkItems.push(bitem.bpnum);
      }
    }
    console.log(checkItems);

    axios
      .post("/bpdCheckedDelete", null, {
        params: { ckList: checkItems.join(",") },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "ok") getBproduct(1);
        else alert("삭제 실패");
      })
      .catch((err) => {
        console.log(err);
        alert("삭제 실패");
      });
  };

  //BProductRegistered 컴포넌트가 화면에 보일 때 서버로부터 등록상품 목록을 가져옴
  useEffect(() => {
    // console.log(bsellerId);
    if (id === null) {
      nav("/", { replace: true });
      return;
    }
    pageNum !== null ? getBproduct(pageNum) : getBproduct(1);
  }, []);

  //등록상품 목록 작성
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
        <TableColumn wd={"w-10"}>
          <CheckBox
            key={item.bpnum}
            itemid={item.bpnum}
            checkItemHandler={checkItemHandler}
            checked={item.checked}
          />
        </TableColumn>
        <TableColumn wd={"w-10"}>{item.bpnum}</TableColumn>
        <TableColumn wd={"w-20"}>
          <img
            onClick={() => getBboard(item.bpnum)}
            className="img"
            src={"../productupload/" + item.bproductFileSysnameM}
          />
        </TableColumn>
        <TableColumn wd={"w-10"}>
          <div onClick={() => getBboard(item.bpnum)}>{item.bpname}</div>
        </TableColumn>
        <TableColumn wd={"w-10"}>{bn(item.bpprice)}</TableColumn>
        <TableColumn wd={"w-10"}>{bn(item.bpwarestock)}</TableColumn>
        <TableColumn wd={"w-10"}>{bn(item.bcondition)}</TableColumn>
        <TableColumn wd={"w-20"}>{bf(item.bpsigndt)}</TableColumn>
      </TableRow>
    ));
  }
  const getBboard = (bpnum) => {
    nav("/bproductview", { state: { bpnum: bpnum } });
  };

  return (
    <div className="BproductRegisterd" style={{ width: "90%" }}>
      <h2>등록한 상품</h2>
      <hr />
      <div className="input-group">
        <select
          className="form-control"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          name="search"
        >
          <option value="">전체분류</option>
          <option value="상품코드" name="상품코드">
            상품코드
          </option>
          <option value="상품명" name="상품명">
            상품명
          </option>
          <option value="가격" name="가격">
            가격
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
          onClick={handleSearch}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div>
        <BproductTable
          className="Table"
          hname={[
            <label>
              <input type="checkbox" onChange={allCheckedHandler} />
            </label>,
            //checkItems, 체크된 아이템 배열에 해당 id가 있으면 체크 없으면 해제
            "분류",
            "상품코드",
            "이미지",
            "상품명",
            "가격",
            "재고",
            "상태",
            "등록일",
            "관리",
          ]}
        >
          {BproductList}
        </BproductTable>
        <Paging page={page} getList={getBproduct} />
      </div>
      <div className="button-group">
        <Button wsize="s-10" color="bule" onClick={bproductwirtego}>
          상품등록
        </Button>
        <Button wsize="s-10" color="red" onClick={checkDelete}>
          상품삭제
        </Button>
      </div>
    </div>
  );
};

export default BproductRegisterd;
