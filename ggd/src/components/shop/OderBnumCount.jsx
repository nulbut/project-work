import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OderBnumCount = ({ productCode }) => {
  const nav = useNavigate();

  const [orderCount, setOrderCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/orders/count/${productCode}`)
      .then((response) => {
        setOrderCount(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [productCode]);

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>에러 발생 : {error.message}</p>;

  //주문내역/배송조회로 이동하는 함수
  const oderpage = () => {
    nav("/bmypage/boderhistory");
  };

  return (
    <div>
      <p>{productCode}</p>
      {orderCount != null ? <p>{orderCount}</p> : <p>not mathching</p>}
    </div>
  );
};

export default OderBnumCount;
