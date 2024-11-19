import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";

const df = (date) => moment(date).format("YYYY-MM-DD");

const UsedView = () => {
  const nav = useNavigate();

  //중고 상품 번호 받기
  const { state } = useLocation();
  const { uc } = state;
  const usedsellerId = sessionStorage.getItem("nid");
  const [UsedRegistered, setUsedRegistered] = useState({});
  console.log(UsedRegistered);
  const [flist, setFlist] = useState([
    {
      usedFileCode: "",
      usedFileNum: "",
      usedFileSysname: "",
      usedFileOriname: "Nothing",
      image: "",
    },
  ]);

  //서버로부터 중고 상품 내용 받아오기
  useEffect(() => {
    axios
      .get("/getusedproduct", { params: { usedCode: uc } })
      .then((res) => {
        setUsedRegistered(res.data);
        console.log(res.data);

        const bfList = res.data.usedproductFileTblList; //UsedproductFileTblList;
        console.log(bfList);

        //파일 목록 처리 (res.data에서 파일목록 꺼내서 flist로 처리)
        if (bfList.length > 0) {
          console.log("bfList.length : ", bfList.length);
          let newFileList = [];
          for (let i = 0; i < bfList.length; i++) {
            const newFile = {
              ...bfList[i],
              image: "../../usupload/" + bfList[i].usedFileSysname,
            };
            newFileList.push(newFile); // 배열에 추가
          }
          console.log(newFileList);
          setFlist(newFileList);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const viewFList = flist.map((v) => {
    return (
      <div className="Down">
        {v.image && <img src={v.image} alt="preview-img" />}
        {v.usedFileOriname}
      </div>
    );
  });

  //usedboardDelete
  const deleteusedProduct = useCallback(() => {
    let conf = window.confirm("상품을 삭제하시겠습니까?");
    if (!conf) {
      //취소 버튼이 눌리면 삭제 종료
      return;
    }

    axios
      .post("/deleteusedProduct", null, { params: { usedCode: uc } })
      .then((res) => {
        if (res.data.res === "ok") {
          alert("삭제 완료");
          nav("/mypage/usedRegistered");
        } else {
          alert("삭제 실패");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="Main">
      <div className="Content">
        <h1>{UsedRegistered.usedName}</h1>
        <div className="DataArea">
          <div className="Box">
            <div className="Title">번호</div>
            <div className="Data">{UsedRegistered.usedCode}</div>
          </div>
          <div className="Box">
            <div className="Title">종류</div>
            <div className="Data">{UsedRegistered.usedcategoryCode}</div>
          </div>
          <div className="Box">
            <div className="Title">판매자</div>
            <div className="Data">{UsedRegistered.usedsellerId}</div>
          </div>
          <div className="Box">
            <div className="Title">판매가격</div>
            <div className="Data">{UsedRegistered.usedSeller}</div>
          </div>
          <div className="Box">
            <div className="Title">구매 제한</div>
            <div className="Data">{UsedRegistered.usedLimit}</div>
          </div>
          <div className="Box">
            <div className="Title">수량</div>
            <div className="Data">{UsedRegistered.usedStock}</div>
          </div>
          <div className="Box">
            <div className="Title">등록일</div>
            <div className="Data">{df(UsedRegistered.usedDate)}</div>
          </div>
          <div className="Box">
            <div className="FileTitle">파일</div>
            <div className="FileData">{viewFList}</div>
          </div>
          <div className="Cont">{UsedRegistered.usedDetail}</div>
        </div>
        <div className="Buttons">
          <Button
            wsize="s-10"
            color="gray"
            onClick={() => nav("/mypage/usedRegistered")}
          >
            뒤로가기
          </Button>
          {usedsellerId === UsedRegistered.usedsellerId ? (
            <>
              <Button wsize="s-10" color="red" onClick={deleteusedProduct}>
                삭제
              </Button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default UsedView;
