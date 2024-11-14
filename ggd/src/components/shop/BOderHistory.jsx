import React, { useEffect, useState } from "react";
import Button from "./Button";
import "./scss/BOderhistory.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Radio from "./Radio";
import axios from "axios";

const BOderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const [dateRange, setDateRange] = useState("today"); // 오늘, 7일, 1개월, 3개월, 1년
  const [orderStatus, setOrderStatus] = useState("all"); // 주문 상태
  const [paymentMethod, setPaymentMethod] = useState("all"); // 결제 수단
  const [otherFilter, setOtherFilter] = useState("all"); // 반품/환불
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const [page, setPage] = useState({
    totalPage: 0,
    pageNum: 1,
  });

  // 주문 목록 필터링 함수
  const filterOrders = () => {
    let filtered = orders;

    // 날짜 필터

    // 주문 상태 필터
    if (orderStatus !== "all") {
      filtered = filtered.filter((order) => order.status === orderStatus);
    }

    // 결제 수단 필터
    if (paymentMethod !== "all") {
      filtered = filtered.filter(
        (order) => order.paymentMethod === paymentMethod
      );
    }

    // 기타 필터 (반품/환불)
    if (otherFilter !== "all") {
      filtered = filtered.filter((order) => order.other === otherFilter);
    }

    // 검색어 필터
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.orderId.includes(searchQuery) ||
          order.productName.includes(searchQuery) ||
          order.buyerId.includes(searchQuery) ||
          order.buyerNickname.includes(searchQuery)
      );
    }

    setFilteredOrders(filtered);
  };

  console.log(
    dateRange,
    orderStatus,
    paymentMethod,
    otherFilter,
    searchQuery,
    orders
  );
  // 주문 목록 가져오기 (예시 API 호출)

  useEffect(() => {
    const paramData = {
      pageNum: page.pageNum,
      searchKeyword: searchQuery,
      timeRange: dateRange,
      payment: paymentMethod,
      // sortBy: sortBy,
      bid: sessionStorage.getItem("bid"),
    };
    axios
      .get("/getStoreOrders", { params: paramData })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  // 필터가 변경될 때마다 다시 필터링
  useEffect(() => {
    filterOrders();
  }, [dateRange, orderStatus, paymentMethod, otherFilter, searchQuery, orders]);

  // 시간 범위 변경 핸들러
  const handleTimeRangeChange = (value) => {
    setDateRange(value);
    setPage((prev) => ({ ...prev, pageNum: 1 }));
  };

  // 상태 변경 핸들러
  const handleStatusChange = (status) => {
    setOrderStatus(status);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleOtherFilterChange = (filter) => {
    setOtherFilter(filter);
  };

  return (
    <div className="main-boderhistory">
      <div className="title">
        <h4>주문목록 / 배송조회 내역 총 {filteredOrders.length} 건</h4>
      </div>
      <div className="oderhistorysearch">
        <div className="oderhistorysearchtitle">
          <p>주문내역 / 배송조회</p>
        </div>
        <div className="searchbox">
          <label>
            <p>조회기간</p>
            <div className="time-filters">
              <button
                className={dateRange === "today" ? "active" : ""}
                onClick={() => handleTimeRangeChange("today")}
              >
                오늘
              </button>
              <button
                className={dateRange === "weekly" ? "active" : ""}
                onClick={() => handleTimeRangeChange("weekly")}
              >
                7일
              </button>
              <button
                className={dateRange === "monthly" ? "active" : ""}
                onClick={() => handleTimeRangeChange("monthly")}
              >
                1개월
              </button>
              <button
                className={dateRange === "daily" ? "active" : ""}
                onClick={() => handleTimeRangeChange("daily")}
              >
                3개월
              </button>
              <button
                className={dateRange === "yearly" ? "active" : ""}
                onClick={() => handleTimeRangeChange("yearly")}
              >
                1년
              </button>
            </div>
            {/* <div>
              <input type="date" />
              -
              <input type="date" />
            </div>
            <Button>조회</Button> */}
          </label>
        </div>

        <div className="selectsearch">
          {/* <div className="input-group">
            <select name="searchType">
              <option value="">분류</option>
              <option value="orderId">주문번호</option>
              <option value="productName">주문상품명</option>
              <option value="buyerId">구매자ID</option>
              <option value="buyerNickname">구매자 닉네임</option>
            </select>
            <input
              className="form-control"
              type="text"
              placeholder="Search for..."
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn btn-primary"
              id="btnNavbarSearch"
              type="button"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div> */}

          <div className="radio-group">
            <p>주문상태</p>
            <div className="radio-item">
              <input
                type="radio"
                id="orderStatusAll"
                name="orderStatus"
                value="all"
                checked={orderStatus === "all"}
                onChange={() => setOrderStatus("all")}
              />
              <label htmlFor="orderStatusAll">전체선택</label>
            </div>

            <div className="radio-item">
              <input
                type="radio"
                id="orderStatusPaymentCompleted"
                name="orderStatus"
                value="paymentCompleted"
                checked={orderStatus === "paymentCompleted"}
                onChange={() => setOrderStatus("paymentCompleted")}
              />
              <label htmlFor="orderStatusPaymentCompleted">입금완료</label>
            </div>
            <div className="radio-item">
              <input
                type="radio"
                id="orderStatusPreparing"
                name="orderStatus"
                value="preparing"
                checked={orderStatus === "preparing"}
                onChange={() => setOrderStatus("preparing")}
              />
              <label htmlFor="orderStatusPreparing">상품준비중</label>
            </div>
            <div className="radio-item">
              <input
                type="radio"
                id="orderStatusShipping"
                name="orderStatus"
                value="shipping"
                checked={orderStatus === "shipping"}
                onChange={() => setOrderStatus("shipping")}
              />
              <label htmlFor="orderStatusShipping">배송중</label>
            </div>
            <div className="radio-item">
              <input
                type="radio"
                id="orderStatusShipped"
                name="orderStatus"
                value="shipped"
                checked={orderStatus === "shipped"}
                onChange={() => setOrderStatus("shipped")}
              />
              <label htmlFor="orderStatusShipped">배송완료</label>
            </div>
          </div>
          <hr />
          <div className="radio-group">
            <p>결제수단</p>
            <div className="radio-item">
              <input
                type="radio"
                id="paymentMethodAll"
                name="paymentMethod"
                value="all"
                checked={paymentMethod === "all"}
                onChange={() => setPaymentMethod("all")}
              />
              <label htmlFor="paymentMethodAll">전체선택</label>
            </div>
            <div className="radio-item">
              <input
                type="radio"
                id="paymentMethodCreditCard"
                name="paymentMethod"
                value="creditCard"
                checked={paymentMethod === "creditCard"}
                onChange={() => setPaymentMethod("creditCard")}
              />
              <label htmlFor="paymentMethodCreditCard">신용카드</label>
            </div>
            <div className="radio-item">
              <input
                type="radio"
                id="paymentMethodBankTransfer"
                name="paymentMethod"
                value="bankTransfer"
                checked={paymentMethod === "bankTransfer"}
                onChange={() => setPaymentMethod("bankTransfer")}
              />
              <label htmlFor="paymentMethodBankTransfer">계좌이체</label>
            </div>
            <div className="radio-item">
              <input
                type="radio"
                id="paymentMethodMobilePayment"
                name="paymentMethod"
                value="mobilePayment"
                checked={paymentMethod === "simplePayment"}
                onChange={() => setPaymentMethod("simplePayment")}
              />
              <label htmlFor="paymentMethodMobilePayment">간편결제</label>
            </div>
          </div>
        </div>
      </div>
      <table border="1">
        <thead>
          <tr>
            <th rowspan="4">1</th>
            <th rowspan="4">주문 일자</th>
            <th rowspan="2" colspan="2">
              주문 번호
            </th>
            <th>주문자</th>
            <th>주문자 전화번호</th>
            <th>수령자</th>

            <th rowspan="4">주문합계</th>
            <th rowspan="4">입금합계</th>
            <th rowspan="4">주문취소</th>
          </tr>

          <tr>
            <th>회원ID</th>
            <th>주문상품 개수</th>
            <th>누적주문수</th>
          </tr>

          <tr>
            <th>주문상태</th>
            <th>결제수단</th>

            <th rowspan="2">운송장번호</th>
            <th rowspan="2">배송회사</th>
            <th rowspan="2">배송일자</th>
          </tr>
          <tr>
            <th colSpan="2">주문상품</th>
          </tr>
        </thead>
        {orders.map((item, index) => (
          <tbody>
            <tr>
              <td rowspan="4">1</td>
              <td rowspan="4">{item.updatedAt}</td>
              <td rowspan="2" colspan="2">
                {item.transactionId}
              </td>
              <td>{item.userName}</td>
              <td> - </td>
              <td>{item.userName}</td>

              <td rowspan="4">{item.totalAmount} 원</td>
              <td rowspan="4">-</td>
              <td rowspan="4">-</td>
            </tr>
            <tr>
              <td>{item.userId}</td>
              <td>{item.quantity} 개</td>
              <td>{item.quantity} 개</td>
            </tr>
            <tr>
              <td>{item.status}</td>
              <td>{item.paymentMethod}</td>
              <td rowspan="2"> - </td>
              <td rowspan="2"> - </td>
              <td rowspan="2"> - </td>
            </tr>
            <tr>
              <td colSpan="2">{item.product_name}</td>
            </tr>
          </tbody>
        ))}
      </table>

      <div className="pagination">
        <Button>이전</Button>
        <Button>다음</Button>
      </div>
    </div>
  );
};

export default BOderHistory;
