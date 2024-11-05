import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";

const ProductUpdate = () => {
    const nav = useNavigate();

    const { state } = useLocation();
    const { productCode } = state;

    const sellerId = sessionStorage.getItem("nid");

    const [data, setData] = useState ({
        productName: "",
        sellerId: 0,
        categoryCode: "",
        sellerPayment: "",
        productLimit: "",
        productStock: "",
        productDetail: "",
    });

    const [flist, setFlist] = useState([
        {
            productFileCode: 0,
            productFileNum: 0,
            productFileSysname: "",
            productFileOriname: "Nothing",
            image: "",
        },
    ]);

    const { categoryCode, 
            productDetail, 
            productName, 
            sellerPayment,
            productLimit,
            productStock,
         } = data;
    //서버로부터 상품정보 받아오기
    useEffect(() => {
        axios
        .get("/getproduct", { params: { productCode: productCode } })
        .then((res) => {
            setData(res.data);

            const bfList = res.data.productFileList;
            console.log(bfList);

            //파일 목록 처리(res.data)에서 파일 목록을 꺼내서 flist로 처리
            if (bfList.length > 0) {
                console.log("bfList.length : ", bfList.length);
                let newFileList = [];
                for (let i = 0; i < bfList.length; i++) {
                    const newFile = {
                        ...bfList[i],
                        image: "../../../upload/" + bfList[i].productFileSysname,
                    };
                    newFileList.push(newFile); //배열에 추가
                }
                console.log(newFileList);
                setFlist(newFileList);
            } 
        })
        .catch((err) => console.log(err));
    }, []);
    
    const viewFlist = flist.map((v, i) => {
      return (
        <div className="Down" key={i}>
          {v.image && <img src={v.image} alt="preview-img"/>}
        </div>
      );
    });

    const [fileName, setFileName] = useState("선택한 파일이 없습니다.");

    const formData = new FormData();

    const onFileChange = useCallback(
        (e) => {
            const files = e.target.files;
            let fnames = ""; //span에 출력할 파일 목록

            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
                fnames += files[i].name + " ";
            }
            
            if (fnames == "") {
                fnames = "선택한 파일이 없습니다.";
            }
            setFileName(fnames);
        },
        [data]
    );
    const onch = useCallback(
        (e) => {
            const dataObj = {
                ...data,
                [e.target.name]: e.target.value,
            };
            setData(dataObj);
        },
        [data]
    );
    const onWrite = useCallback(
        (e) => {
            e.preventDefault(); //페이지 변환을 방지하는 함수

            //전송 시 파일 이외 데이터를 폼데이터에 추가
            formData.append(
                "data",
                new Blob([JSON.stringify(data)], { type: "application/json" })
            );

            axios
            .post("/pdwriteProc", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                if (res.data === "ok") {
                    alert("수정 성공");
                    nav("/mypage/productRegistered");
                } else {
                    alert("수정 실패");
                }
            })
            .catch((err) => {
                alert("수정 실패");
                console.log(err);
            });
        },
        [data]
    );
    return (
        <div className="update">
            <div className="Content" onSubmit={onWrite}>
            <h1>상품 등록</h1>
        <input
          className="Input"
          name="productName"
          value={productName}
          placeholder="제품명"
          onChange={onch}
          autoFocus
          required
        />
        <input
          className="Input"
          name="sellerId"
          value={sellerId}
          placeholder="판매자"
          onChange={onch}
          autoFocus
          required
        />
        <input
          className="Input"
          name="categoryCode"
          value={categoryCode}
          placeholder="카테고리"
          onChange={onch}
          autoFocus
          required
        />
        <input
          className="Input"
          name="sellerPayment"
          value={sellerPayment}
          placeholder="판매가"
          onChange={onch}
          autoFocus
          required
        />
        <input
          className="Input"
          name="productLimit"
          value={productLimit}
          placeholder="구매제한"
          onChange={onch}
          autoFocus
          required
        />
        <input
          className="Input"
          name="productStock"
          value={productStock}
          placeholder="수량"
          onChange={onch}
          autoFocus
          required
        />
        <textarea
          className="Textarea"
          name="productDetail"
          onChange={onch}
          placeholder="상품 정보를 입력하세요."
          value={productDetail}
        ></textarea>
        <div className="Box">
          <div className="FileTitle">File</div>
          <div className="FileData">{viewFlist}</div>
        </div>
        <div className="FileInput">
          <input id="update" type="file" multiple onChange={onFileChange} />
          <label className="FileLabel" htmlFor="../../upload">
            파일선택
          </label>
          <span className="FileSpan">{fileName}</span>
        </div>
        <div>
          <Button
            type="button"
            size="large"
            color="gray"
            wsize="s-10"
            outline
            onClick={() => nav("/mypage/productRegistered")}
          >
            목록으로
          </Button>
          <Button type="submit" size="large" wsize="s-30">
            등록
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ProductUpdate;