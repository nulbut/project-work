import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";

const ProductUpdate = () => {
    const nav = useNavigate();

    const { state } = useLocation();
    const { productCode } = state;
    const { productName } = state;

    const sellerId = sessionStorage.getItem("sellerId");

    const [data, setData ] = useState ({
        productCode: productCode,
        productName: "",
        productDetail: "",
        categoryCode: "",
    });

    const [flist, estFlist] = useState([
        {
            productCode: 0,
            categoryCode: "",
            sellerId: 0,
            productFileSysname: "",
            productFileOriname: "Nothing",
            image: "",
            productName: 0,
        },
    ]);

    const { categoryCode, productDetail } = data;
    //서버로부터 상품정보 받아오기
    useEffect(() => {
        axios
        .get("/getproduct", { params: { productCode: productCode } })
        .then((res) => {
            setData(res.data);

            //파일 목록 처리(res.data)에서 파일 목록을 꺼내서 flist로 처리
            
        })
    })
}

export default ProductUpdate;