import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InquiryWrite = () => {
  const nav = useNavigate();
  const id = sessionStorage.getItem("nid");
  const product = sessionStorage.getItem("ProductCode");
  const [data, setData] = useEffect({
    product: product,
    boardType: "",
    boardTitle: "",
    bnid: id,
    b,
  });

  return <div></div>;
};

export default InquiryWrite;
