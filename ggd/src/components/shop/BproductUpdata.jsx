import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BproductUpdata = () => {
  const nav = useNavigate();

  const { state } = useLocation();
  const { bpnum } = state;
  const { bpname } = state;
  const { bpprice } = state;
  const { bpprestriction } = state;
  const { bpwarestock } = state;
  const { bpexplanation } = state;
  const { bpdate } = state;
  const { bpsize } = state;
  const { bpmaterial } = state;

  const bsellerId = sessionStorage.getItem("bsellerId");

  const [data, setData] = useState({
    bpname: bpname,
    bsellerId: 0,
    bpprice: "",
    bpprestriction: "",
    bpwarestock: "",
    bpexplanation: "",
    bpdate: "",
    bpsize: "",
    bpmaterial: "",
  });

  const [first, setFirst] = useState([
    {
      bproductfilecode: 0,
      bproductfilenum: 0,
      bproductfilesysname: "",
      bproductfileoriname: "Nothing",
      image: "",
    },
  ]);

  //   const { bpexplanation } = data;
  //서버로부터 상품 정보 받아오기
  useEffect(() => {
    axios;
  });
  return <div></div>;
};

export default BproductUpdata;
