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

  //상품번호 받기

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

  const onch = useCallback(
    (e) => {
      const stockObj = {
        ...stockdata,
        [e.target.name]: e.target.value,
      };
      setStockdata(stockObj);
    },
    [stockdata]
  );

  //수정완료 버튼 (재고상품 입력해서 창고재고 변경하기, 통보재고 DB입력하기)
  const onUpdata = useCallback(
    (e) => {
      e.preventDefault(); //페이지 변환을 방지하는 함수

      const sformData = new FormData();

      sformData.append(
        "stockdata",
        new Blob([JSON.stringify(stockdata)], { type: "application/json" })
      );

      axios
        .post("/bproductstockupdate", sformData)
        .then((res) => {
          if (res.data === "ok") {
            alert("수정 성공");
            nav("/bproductstock", { state: { id: id } });
          } else {
            alert("수정 실패");
          }
        })
        .catch((err) => {
          alert("전송 실패");
          console.log(err);
        });
    },
    [stockdata]
  );

  console.log("재고값", stockdata);

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
        <TableColumn wd={"w-10"}>
          <br></br>
          <div>
            <input
              className="Input"
              type="text"
              name="bpwarestock"
              value={bpwarestock}
              onChange={onch}
              autoFocus
            />
          </div>
        </TableColumn>
        <TableColumn wd={"w-10"}>
          <div>{bbitem.bpwarestocklimt}</div>
          <div>
            <input
              className="Input"
              type="text"
              name="bpwarestocklimt"
              value={bpwarestocklimt}
              onChange={onch}
              autoFocus
            />
          </div>
        </TableColumn>
      </TableRow>
    ));
  }
  const getBboard = (bpnum) => {
    nav("/bproductview", { state: { bpnum: bpnum } });
  };

  return (
    <div>
      <form className="Contetnt" onSubmit={onUpdata}>
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
              "재고수정",
              "통보수량",
            ]}
          >
            {BproductList}
          </BproductStockTable>
        </div>
        {/* <Paging page={page} getList={getBproduct} /> */}
        <div className="Buttons">
          <Button type="submit">수정완료</Button>
        </div>
      </form>
    </div>
  );
};

export default BProductStock;
