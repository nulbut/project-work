import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";

const df = (date) => moment(date).format("YYYY-MM-DD HH:mm:ss ");

const ProductView = () => {
    const nav = useNavigate();

    //상품 번호 받기
    const { state } = useLocation();
    const { pc } = state;

    const sellerId = sessionStorage.getItem("sellerId");

    const [board, setBoard] = useState({});
    const [flist, setFlist] = useState([
        {
            productFileCode: 0,
            productFileNum: 0,
            productFileSysname: "",
            productFileOriname: "Nothing",
            image: "",
        },
    ]);

    //서버로부터 상품 내용 받아오기
    useEffect(() => {
        axios
        .get("/BoardList", { params: { productCode: pc } })
        .then((res) => {
            setBoard(res.data);

            //파일 목록 처리
            if (res.data.pfList.length > 0) {
                let newFileList = [];
                for (let i = 0; i < res.data.pfList.length; i++) {
                    const newFile = {
                        ...res.data.pfList[i],
                        image: "upload/" + res.data.pfList[i].productFilesysname,
                    };
                    newFileList.push(newFile);
                }
                setFlist(newFileList);
            }
        })
        .catch((err) => console.log(err));
    }, []);
    
    const boardDelete = useCallback(() => {
        let conf =window.confirm("삭제하시겠습니까?");
        if (!conf) {
            //취소 버튼이 눌리면 삭제 종료
            return;
        }

        axios
        .post("/boardDelete", null, { params: { productCode: pc } })
        .then((res) => {
            if (res.data.res === "ok") {
                alert("삭제완료");
                nav("/456");
            } else {
                alert("삭제 실패");
            }
        })
        .catch((err) => console.log(err));
    }, []);

    const updateBoard = () => {
        nav("/123", { state: { productCode: pc } });
    };
    
    return (
        <div className="productBoard">
            <div className="Content">
                <h1>{board.productName}</h1>
                <div className="DataArea">
                    <div className="Box">
                        <div className="Title">번호</div>
                        <div className="Data">{board.productCode}</div>
                    </div>
                    <div className="Box">
                        <div className="Title">판매자</div>
                        <div className="Data">{board.sellerId}</div>
                    </div>
                    <div className="Box">
                        <div className="title">등록일</div>
                        <div className="Data">{df(board.productDate)}
                        </div>
                        <div className="Buttons">
                            <Button wsize="s-10" color="gray" onClick={() => nav("/123")}>
                                B
                            </Button>
                            {sellerId === board.sellerId ? (
                                <>
                                <Button wsize="s-10" color="red" onClick={updateBoard}>
                                    U
                                </Button>
                                <Button wsize="s-10" color="red" onClick={boardDelete}>
                                    D
                                </Button>
                                </>
                            ) : (
                            ""
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductView;