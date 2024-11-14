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
import OderBnumCount from "./OderBnumCount";

const bn = (Number) => Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const BProductStock = () => {
  const nav = useNavigate();

  const id = sessionStorage.getItem("bid");
  const bsellerId = sessionStorage.getItem("nnickname");
  const pageNum = sessionStorage.getItem("pageNum");
  const [isStockDeducted, setIsStockDeducted] = useState(null);


  const [bbitem, setBbitem] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState({ totalPage: 0, pageNum: 1 });

  // 상품 데이터를 가져오는 함수
  const getBproduct = (pnum) => {
    axios
      .get("/BproductList", {
        params: { pageNum: pnum, bsellerId: bsellerId },
      })
      .then((res) => {
        const { bList, totalPage, pageNum } = res.data;
        setPage({ totalPage: totalPage, pageNum: pageNum });
        setBbitem(bList);

        // 상품 데이터를 가져온 후 주문 데이터와 매핑
        fetchOrdersAndMapItems(bList);
      })
      .catch((err) => console.log(err));
  };

  // 주문 데이터를 가져와 상품 데이터와 매핑하는 함수
  const fetchOrdersAndMapItems = (bList) => {
    const bid = sessionStorage.getItem("bid");
    axios
      .get("/getStoreOrders", { params: { bid } })
      .then((res) => {
        const ordersData = res.data;
        setOrders(ordersData);
  
        // 주문 데이터에서 bpnum별 주문 수량을 계산
        const orderMap = {};
        ordersData.forEach((order) => {
          // 만약 product_code와 bpnum이 같은 타입이 아닌 경우, 타입 변환 추가
          const key = order.product_code.toString(); // 또는 parseInt(order.product_code, 10) 필요 시
          if (orderMap[key]) {
            orderMap[key] += order.quantity;
          } else {
            orderMap[key] = order.quantity;
          }
        });
  
        // bList를 업데이트하여 각 아이템에 주문 대기 수량 추가
        const updatedItems = bList.map((item) => ({
          ...item,
          quantity: orderMap[item.bpnum] || 0, // item.bpnum이 orderMap 키와 일치하는지 확인
        }));
        setFilteredItems(updatedItems);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  };
  
  

  // 검색 기능
  const handleSearch = () => {
    if (!searchCategory || !searchTerm) {
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
    setFilteredItems(filteredList);
  };

  useEffect(() => {
    if (!id) {
      nav("/", { replace: true });
      return;
    }
    pageNum !== null ? getBproduct(pageNum) : getBproduct(1);
  }, []);

  // 등록 상품 목록 작성
  let BproductList = filteredItems.length
    ? filteredItems.map((item) => (
        <TableRow key={item.bpnum}>
          <TableColumn wd={"w-30"}>{item.bpnum}</TableColumn>
          <TableColumn wd={"w-20"}>
            <div>
              <img
                onClick={() => nav("/bproductview", { state: { bpnum: item.bpnum } })}
                className="img"
                src={`../productupload/${item.bproductFileSysnameM}`}
                alt="product"
              />
              <div onClick={() => nav("/bproductview", { state: { bpnum: item.bpnum } })}>
                {item.bpname}
              </div>
            </div>
          </TableColumn>
          <TableColumn wd={"w-10"}>{item.bpwarestock}</TableColumn>
          <TableColumn wd={"w-10"}>{item.quantity}</TableColumn>
          <TableColumn wd={"w-30"}>{item.bcondition}</TableColumn>
        </TableRow>
      ))
    : (
      <TableRow key={0}>
        <TableColumn span={4}>등록된 상품이 없습니다.</TableColumn>
      </TableRow>
    );

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
        >
          <option value="">전체</option>
          <option value="상품명">상품명</option>
          <option value="상품코드">상품코드</option>
          <option value="상태">상태</option>
        </select>
        <input
          className="form-control"
          type="text"
          placeholder="Search for..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSearch}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div className="Table">
        <BproductStockTable
          hname={["상품코드", "상품명", "창고재고", "주문대기", "상태"]}
        >
          {BproductList}
        </BproductStockTable>
      </div>
      <Paging className="page" page={page} getList={getBproduct} />
    </div>
  );
};

export default BProductStock;
