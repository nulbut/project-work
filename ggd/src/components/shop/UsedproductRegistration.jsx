import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./Button";
import "./scss/Input.scss";
import "./scss/Textarea.scss";
import "./scss/FileInput.scss";
import "./scss/Write.scss";

// 24-10-11 09:22 시작

// 24-10-14 09:05 수정 시작
const UsedproductRegistration = () => {
    const nav = useNavigate();
    const id = sessionStorage.getItem("mid");
    const [data, setData] = useState({
        upName: "",
        upPrice: "",
        upPurchaserestrictions: "",
        upDeliveryfee: "",
        upQuantity: "",
        upDetail: "",
        upDate: "",
    });

    const { upName, upPrice, upPurchaserestrictions, upDeliveryfee, upQuantity, upDetail, upDate } = data;
    const [fileName, setFileName] = useState("선택된 파일이 없습니다.");

    //전송 데이터와 파일을 담을 멀티파트 폼 생성
    let formData = new FormData();

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
    //파일 선택 시 폼데이터에 파일 목록 추가(다중파일)
    const onFileChange = useCallback(
        (e) => {
            const files = e.target.files;
            let fnames = "";//span에 출력할 파일명 목록

            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
                fnames += files[i].name + " ";
            }
            
            if (fnames === ""){
                fnames = "선택한 파일이 없습니다.";
            }
            setFileName(fnames);
        }, 
        [formData]
    );

    //작성한 내용(제목, 글, 파일들) 전송 함수
    const onWrite = useCallback(
        (e) => {
            e.preventDefault(); // 페이지 변환을 방지하는 함수.

            //전송 시 파일 이외의 데이터를 폼데이터에 추가
            formData.append(
                "data",
                new Blob([JSON.stringify(data)], { type: "application/json" })
            );

            axios
            .post("/pdwriteProc", formData, {
                headers: { "Content-Type": "Multipart/form-data" },
            })
            .then((res) => {
                if (res.data === "ok"){
                    alert("등록 성공");
                    nav("")
                } else {
                    alert("등록 실패");
                }
            })
            .catch((err) => {
                alert("전송 실패");
                console.log(err);
            });
        },
        [data]
    );

    return (
        <div className="Write">
            <form className="Content" onSubmit={onWrite}>
                <h1>중고 상품 등록</h1>
                <input
                className="Input"
                name="upName"
                value={upName}
                placeholder="제품명"
                onChange={onch}
                autoFocus
                required
                />
                <input
                className="Input"
                name="upPrice"
                value={upPrice}
                placeholder="판매가"
                onChange={onch}
                autoFocus
                required
                />
                <input
                className="Input"
                name="upPurcharserestictions"
                value={upPurchaserestrictions}
                placeholder="구매제한"
                onChange={onch}
                autoFocus
                required
                />
                <input
                className="Input"
                name="upDeliveryfee"
                value={upDeliveryfee}
                placeholder="배송비"
                onChange={onch}
                autoFocus
                required
                />
                <input
                className="Input"
                name="upQuantity"
                value={upQuantity}
                placeholder="수량"
                onChange={onch}
                autoFocus
                required
                />
                <input
                className="Input"
                name="upDate"
                value={upDate}
                placeholder="등록일"
                onChange={onch}
                autoFocus
                required
                />
                <textarea
                className="Textarea"
                name="upDetail"
                onChange={onch}
                placeholder="상품 정보를 입력하세요."
                value={upDetail}
                ></textarea>
                <div className="FileInput">
                    <input id="upload" type="file" multiple onChange={onFileChange} />
                    <label className="FileLabel" htmlFor="upload">
                        파일선택
                    </label>
                    <span className="FileSpan">{fileName}</span>
                </div>
                <div className="Buttons">
                    <Button
                      type="button"
                      size="large"
                      color="gray"
                      wsize="s-10"
                      outline
                      onClick={() => nav("/main")}
                    >
                      삭제
                    </Button>
                    <Button type="submit" size="large" wsize="s-30">
                      수정
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UsedproductRegistration;