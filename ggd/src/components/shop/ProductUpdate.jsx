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
}

export default ProductUpdate;