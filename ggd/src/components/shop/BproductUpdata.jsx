import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import "./scss/Input.scss";
import "./scss/Textarea.scss";
import "./scss/FileInput.scss";
import "./scss/Write.scss";

const BproductUpdata = () => {
  //토글용 state (on,off)
  const [isOpen, setIsOpen] = useState(true);

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
  const nav = useNavigate();

  const { state } = useLocation();
  const { bpnum } = state;

  const bsellerId = sessionStorage.getItem("bsellerId");

  const [data, setData] = useState({
    bpnum: bpnum,
    bpname: "",
    bsellerId: bsellerId,
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
  const { bpname, bpprice, bpprestriction, bpexplanation, bpdate, bpmaterial } =
    data;
  // 서버로부터 상품 정보 받아오기
  useEffect(() => {
    axios
      .get("/getBproduct", { params: { bpnum: bpnum } })
      .then((res) => {
        setData(res.data);

        //파일 목록 처리(res.data에서 파일 목록 꺼내서 flist로 처리)
        if (res.data.bpfList.length > 0) {
          let newFileList = [];
          for (let i = 0; i < res.data.bpfList.length; i++) {
            const newFile = {
              ...res.data.bpfList[i],
              image: "productupload/" + res.data.bpfList[i].bproductfilesysname,
            };
            newFileList.push(newFile); //배열에 추가
          }
          setFirst(newFileList);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const bonch = useCallback(
    (e) => {
      const bdataObj = {
        ...data,
        [e.target.name]: e.target.value,
      };
      setData(bdataObj);
    },
    [data]
  );

  const [fileName, setFileName] = useState("선택한 파일이 없습니다.");
  //파일 선택 시 폼데이터에 파일 목록 추가
  const onBFileChange = useCallback((e) => {
    const bfiles = e.target.files;
    let bfnames = ""; //span에 출력할 파일명 목록

    for (let i = 0; i < bfiles.length; i++) {
      bfnames += bfiles[i].name + " ";
    }
    if (bfnames === "") {
      bfnames = "선택한 파일이 없습니다.";
    }
    setFileName(bfnames);
  }, []);

  return (
    <div>
      <form className="Content">
        <hr />
        <div></div>
        <p>상품 이미지</p>
        <div>
          <input id="upload" type="file" multiple onChange={onBFileChange} />
          <label className="FileLabel" htmlFor="upload">
            파일선택
          </label>

          <span className="FileSpan">{fileName}</span>
          {/* <p>미리보기들어갈것</p> */}
        </div>
        <div>
          <Button>등록</Button>
          <Button onClick={() => nav("/bmypage/bp1")}>뒤로가기</Button>
        </div>
      </form>
    </div>
  );
};

export default BproductUpdata;
