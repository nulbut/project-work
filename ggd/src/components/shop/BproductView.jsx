import axios from "axios";
import Button from "./Button";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./scss/BProductView.scss";

const df = (date) => moment(date).format("YYYY-MM-DD HH:mm:ss");
//const bn = (Number) => Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const bn = (num) => {
  console.log(num);
  let newNum = 0;
  if (num !== undefined) {
    console.log("!!!!!!");
    newNum = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return newNum;
};

const BproductView = () => {
  const nav = useNavigate();

  //상품 번호 받기
  const { state } = useLocation();
  const { bpnum } = state;
  console.log(bpnum);

  const bsellerId = sessionStorage.getItem("bid");

  console.log(bsellerId);

  const [BproductRegistered, setBproductRegistered] = useState({});
  console.log(BproductRegistered);
  const [filst, setFilst] = useState([
    {
      bpprice: "",
      bprobid: "",
      bpprestriction: "",
      bpwarestock: "",
      bpexplanation: "",
      bpdate: "",
      bpsize: "",
      bpmaterial: "",
      bproductfilecode: "",
      bproductfilesysname: "",
      bproductfileoriname: "Nothing",
      image: "",
    },
  ]);

  //서버로 부터 상품 내용 받아오기
  useEffect(() => {
    getBProduct();
  }, []);

  const getBProduct = () => {
    axios
      .get("/getBproduct", { params: { bpnum: bpnum } })
      .then((res) => {
        setBproductRegistered(res.data);
        console.log(res.data);

        const bfList = res.data.bproductFileTblList;
        console.log(bfList);

        //파일 목록 처리 (res.data에서 파일 목록을 꺼내서 flist로 처리)
        if (bfList.length > 0) {
          console.log("bfList.length : ", bfList.length);
          let newFileList = [];
          for (let i = 0; i < bfList.length; i++) {
            const newFile = {
              ...bfList[i],
              image: "productupload/" + bfList[i].bproductfilesysname,
            };
            newFileList.push(newFile); //배열 추가
          }
          console.log(newFileList);
          setFilst(newFileList);
        }
      })
      .catch((err) => console.log(err));
  };

  const viewFilst = filst.map((v) => {
    return (
      <div className="Down">
        {v.image && <img src={v.image} alt="preview-img" />}
        {/* {v.bproductfilesysname} */}
      </div>
    );
  });

  //삭제
  const deleteBproduct = useCallback(() => {
    let conf = window.confirm("삭제하시겠습니까?");
    if (!conf) {
      //취소 버튼 눌리면 삭제 종료
      return;
    }

    axios
      .post("/bpdDelete", null, { params: { bpnum: bpnum } })
      .then((res) => {
        if (res.data.res === "ok") {
          alert("삭제완료");
          nav("/bmypage/bp1");
        } else {
          alert("삭제 실패");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  //상품 수정 버튼으로 이동
  const updateBproduct = () => {
    nav("/bproductupdata", { state: { bpnum: bpnum } });
  };

  return (
    <div className="Main">
      <div className="Content">
        <h1>{BproductRegistered.bpname}</h1>
        <div className="DataArea">
          <div className="Box">
            <div className="Title">번호</div>
            <div className="Data">{BproductRegistered.bpname}</div>
          </div>
          <div className="Box">
            <div className="Title">종류</div>
            <div className="Data">나중에 불러오기</div>
          </div>
          <div className="Box">
            <div className="Title">판매자</div>
            <div className="Data">{BproductRegistered.bsellerId}</div>
          </div>
          <div className="Box">
            <div className="Title">판매가격</div>
            <div className="Data">{bn(BproductRegistered.bpprice)}</div>
          </div>
          <div className="Box">
            <div className="Title">구매제한</div>
            <div className="Data">{BproductRegistered.bpprestriction}</div>
          </div>
          <div className="Box">
            <div className="Title">수량</div>
            <div className="Data">{BproductRegistered.bpwarestock}</div>
          </div>
          <div className="Box">
            <div className="Title">등록일</div>
            <div className="Data">{df(BproductRegistered.bpdate)}</div>
          </div>
          <div className="Box">
            <div className="FileTitle">이미지</div>
            <div className="FileData">{viewFilst}</div>
          </div>
          <div className="Cont">{BproductRegistered.bpexplanation}</div>
        </div>
        <div className="Buttons">
          <Button
            wsize="s-10"
            color="gray"
            onClick={() => nav("/bmypage/bp1", { state: { bpnum: bpnum } })}
          >
            뒤로가기
          </Button>
          {bsellerId === BproductRegistered.bprobid ? (
            <>
              <Button wsize="s-10" color="red" onClick={updateBproduct}>
                수정
              </Button>
              <Button wsize="s-10" color="red" onClick={deleteBproduct}>
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

export default BproductView;
