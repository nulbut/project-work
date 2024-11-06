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
  const bbpNum = 1;

  console.log(id);

  const [bbitem, setBbitem] = useState([]);

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
        setpage({ totalPage: totalPage, pageNum: pageNum });
        // console.log(page);
        let newBlist = [];
        for (let bItem of bList) {
          newBlist.push({ ...bItem, checked: false });
        }
        //setitem(bList);
        setBbitem(newBlist);
        //console.log(bList);
        sessionStorage.getItem("pageNum", pageNum);
      })
      .catch((err) => console.log(err));
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
        <TableColumn wd={"w-10"}>
          <CheckBox
            key={bbitem.bpnum}
            itemid={bbitem.bpnum}
            checkItemHandler={checkItemHandler}
            checked={bbitem.checked}
          />
        </TableColumn>
        <TableColumn wd={"w-10"}>{bbitem.bpnum}</TableColumn>
        <TableColumn wd={"w-20"}>
          <img
            className="img"
            src={"../productupload/" + bbitem.bproductFileSysnameM}
          />
        </TableColumn>
        <TableColumn wd={"w-10"}>
          <div onClick={() => getBboard(bbitem.bpnum)}>{bbitem.bpname}</div>
        </TableColumn>
        <TableColumn wd={"w-10"}>{bn(bbitem.bpprice)}</TableColumn>
        <TableColumn wd={"w-10"}>{bn(bbitem.bpwarestock)}</TableColumn>
        <TableColumn wd={"w-10"}>
          <input className="Input" type="checkbox" />
        </TableColumn>
        <TableColumn wd={"w-20"}>{bf(bbitem.bpsigndt)}</TableColumn>
      </TableRow>
    ));
  }
  const getBboard = (bpnum) => {
    nav("/bproductview", { state: { bpnum: bpnum } });
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
            "품절",
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
        <Button onClick={checkDelete}>상품삭제</Button>
      </div>
    </div>
  );
};

export default BproductRegisterd;
