import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OderBnumCount = ({ code }) => {
  const nav = useNavigate();
  const [oderCount, setOderCount] = useState(0);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    //서버에서 주문 완료 건수를 가져옴
    axios
      .get(`/countorder/${code}`)
      .then((response) => {
        setOderCount(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [code]); // code 값이 변경될때마다 API 호출

  //주문내역/배송조회로 이동하는 함수
  const oderpage = () => {
    nav("/bmypage/boderhistory");
  };

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>{error.messge}</p>;

  return (
    <div>
      <p onClick={oderpage}>{oderCount}</p>
    </div>
  );
};

export default OderBnumCount;
