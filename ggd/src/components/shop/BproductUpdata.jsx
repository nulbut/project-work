import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "./Button";
import "./scss/Input.scss";
import "./scss/Textarea.scss";
import "./scss/FileInput.scss";
import "./scss/Write.scss";
import toggleoff from "../images/toggleoff.png";
import toggleon from "../images/toggleon.png";

const BproductUpdata = () => {
  //상품번호 받기
  const { state } = useLocation();
  const { bpnum } = state;

  console.log(bpnum);

  //토글용 state (on,off)
  const [isOpen, setIsOpen] = useState(true);
  const [files, setFiles] = useState([]);

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
  const nav = useNavigate();

  const bsellerId = sessionStorage.getItem("bsellerId");
  const bprobid = sessionStorage.getItem("bid");

  const [data, setData] = useState({
    bprobid: bprobid,
    bpname: "",
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

  const {
    bpname,
    bpprice,
    bpsize,
    bpprestriction,
    bpwarestock,
    bpexplanation,
    bpdate,
    bpmaterial,
  } = data;

  // 서버로부터 상품 정보 받아오기
  const getProduct = () => {
    axios
      .get("/getBproduct", { params: { bpnum: bpnum } })
      .then((res) => {
        setData(res.data);
        console.log(res.data);

        const bflist = res.data.bproductFileTblList;
        console.log(bflist);

        //파일 목록 처리(res.data에서 파일 목록 꺼내서 flist로 처리)
        if (bflist.length > 0) {
          console.log("bflist.length : ", bflist.length);
          let newFileList = [];
          for (let i = 0; i < bflist.length; i++) {
            const newFile = {
              ...bflist.length[i],
              image: "productupload/" + bflist[i].bproductfilesysname,
            };
            newFileList.push(newFile); //배열에 추가
          }
          // console.log(newFileList);
          setFirst(newFileList);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProduct();
  }, []);

  //미리보기 생성
  const viewFlist = first.map((v, i) => {
    return (
      <div key={i}>
        {v.image && <img src={v.image} alt="preview-img" />}
        {v.bproductfileoriname}
      </div>
    );
  });

  const bonch = useCallback(
    (e) => {
      const bdataObj = {
        ...data,
        [e.target.name]: e.target.value,
      };
      setData(bdataObj);
    },
    [data, first]
  );

  const [fileName, setFileName] = useState("선택한 파일이 없습니다.");
  //파일 선택 시 폼데이터에 파일 목록 추가
  const onBFileChange = useCallback((e) => {
    const bfiles = e.target.files;
    let bfnames = ""; //span에 출력할 파일명 목록
    setFiles(e.target.files);

    for (let i = 0; i < bfiles.length; i++) {
      bfnames += bfiles[i].name + " ";
    }
    if (bfnames === "") {
      bfnames = "선택한 파일이 없습니다.";
    }
    setFileName(bfnames);
  }, []);
  console.log(data);
  const bonWrite = useCallback(
    (e) => {
      e.preventDefault(); //페이지 변환을 방지하는 함수

      const bformData = new FormData();

      for (let i = 0; i < files.length; i++) {
        bformData.append("files", files[i]);
      }

      //전송 시 파일 이외의 데이터를 폼 데이터에 추가
      bformData.append(
        "data",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );

      for (let key of bformData.keys()) {
        console.log(key);
      }

      axios
        .post("/bproductupdate", bformData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.data === "ok") {
            alert("수정 성공");
            nav("/bproductview", { state: { bpnum: bpnum } });
          } else {
            alert("수정 실패");
          }
        })
        .catch((err) => {
          alert("전송 실패");
          console.log(err);
        });
    },
    [data, files]
  );
  console.log("현재값", data);
  console.log(first);

  return (
    <div className="Write">
      <form className="Content" onSubmit={bonWrite}>
        <h3>상품등록</h3>
        <hr />
        <input type="hidden" value={bprobid} />
        <div>
          <p className="title">카테고리</p>
          <p>대분류</p>
          <div>
            {/* <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="대분류 검색"
            aria-label="Search for..."
            aria-describedby="btnNavbarSearch"
          />
          <button
            className="btn btn-primary"
            id="btnNavbarSearch"
            type="button"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div> */}
            <input className="Input" type="text" />
          </div>
          <p>중분류</p>
          <div>
            {/* <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="중분류 검색"
            aria-label="Search for..."
            aria-describedby="btnNavbarSearch"
          />
          <button
            className="btn btn-primary"
            id="btnNavbarSearch"
            type="button"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div> */}
            <input className="Input" type="text" />
          </div>
          <p>소분류</p>
          <div>
            {/* <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="소분류 검색"
            aria-label="Search for..."
            aria-describedby="btnNavbarSearch"
          />
          <button
            className="btn btn-primary"
            id="btnNavbarSearch"
            type="button"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div> */}
            <input className="Input" type="text" />
          </div>
        </div>
        <div>
          <p className="title">상품정보</p>
          {/*판매자 정보 자동으로 들어가게 설정*/}
          <input
            className="Input"
            type="hidden"
            name="bsellerId"
            value={bsellerId}
            onChange={bonch}
            autoFocus
            required
          />
          {/*여기까지*/}

          <p>제품명</p>
          <input
            className="Input"
            name="bpname"
            value={bpname}
            placeholder="제품명"
            onChange={bonch}
            autoFocus
            required
          />
          <p>판매가격</p>
          <input
            className="Input"
            name="bpprice"
            value={bpprice}
            placeholder="판매가격"
            onChange={bonch}
            autoFocus
            required
          />
          <p>구매제한</p>
          <input
            className="Input"
            name="bpprestriction"
            value={bpprestriction}
            placeholder="구매제한 수"
            onChange={bonch}
            autoFocus
            required
          />
          <p>창고재고</p>
          <input
            className="Input"
            name="bpwarestock"
            value={bpwarestock}
            placeholder="창고재고 수"
            onChange={bonch}
            autoFocus
            required
          />
          <p>출시일</p>
          <input
            type="date"
            className="Input"
            name="bpdate"
            value={bpdate}
            placeholder="출시일"
            onChange={bonch}
            autoFocus
            required
          />
          {/* <p>상품 이미지</p> */}
          <div>
            {/* <input type="file" id="upload" multiple onChange={onBFileChange} />
          <label className="FileLabel" htmlFor="upload">
            업로드
          </label> */}
            {/* <span className="FileSpan">{fileName}</span> */}
            {/* <p>미리보기들어갈것 </p> */}
          </div>
        </div>
        <div>
          <p className="title">상품상세정보</p>
          <p>상품 상세 설명</p>
          <textarea
            className="Input"
            name="bpexplanation"
            value={bpexplanation}
            placeholder=""
            onChange={bonch}
            autoFocus
            required
          ></textarea>
        </div>
        <div>
          <p className="title">옵션사용</p>
          <p>상품 옵션</p>
          <div className="onoff">
            {isOpen ? (
              <img src={toggleon} onClick={toggleHandler} />
            ) : (
              <img src={toggleoff} onClick={toggleHandler} />
            )}
          </div>
        </div>
        <div>
          <p className="title">사양</p>
          <p>사이즈</p>
          <input
            className="Input"
            name="bpsize"
            value={bpsize}
            placeholder="사이즈"
            onChange={bonch}
            autoFocus
            required
          />
          <p>재질</p>
          <input
            className="Input"
            name="bpmaterial"
            value={bpmaterial}
            placeholder="재질"
            onChange={bonch}
            autoFocus
            required
          />
        </div>
        <p>상품 이미지</p>
        <div className="FileInput">
          <div className="FileUpload">
            <input id="upload" type="file" multiple onChange={onBFileChange} />
            <label className="FileLabel" htmlFor="upload">
              파일선택
            </label>
            <span className="FileSpan">{fileName}</span>
          </div>
          <div className="FileView">
            {/* <p>미리보기</p> */}
            <div>이전 이미지{viewFlist}</div>
            {/* <div>수정 이미지{viewFile}</div> */}
          </div>
        </div>
        <div>
          <Button type="submit">수정</Button>
          <Button onClick={() => nav("/bmypage/bp1")}>뒤로가기</Button>
        </div>
      </form>
    </div>
  );
};

export default BproductUpdata;
