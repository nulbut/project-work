import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../idealcup/Button";

const Nupdate = () => {
  const nav = useNavigate();

  const { state } = useLocation();
  const { nnum } = state;

  const id = sessionStorage.getItem("nid");

  const [data, setData] = useState({
    nnum: nnum,
    ntitle: "",
    nadminid: id,
    bcontent: "",
  });

  const [nflist, setnFlist] = useState([
    {
      nfnum: 0,
      nfaid: 0,
      nfsysnsme: "Nothing",
      Image: "",
    },
  ]);

  const { ntitle, ncontent } = data;

  useEffect(() => {
    axios
      .get("/getNotice", { params: { nnum: nnum } })
      .then((res) => {
        setData(res.data);

        if (res.data.nflist.length > 0) {
          let newFileList = [];
          for (let i = 0; i < res.data.nfList.length; i++) {
            const newFile = {
              ...res.data.nfList[i],
              Image: "upload/" + res.data.nfList[i].nfsysnsme,
            };
            newFileList.push(newFile);
          }
          setnFlist(newFileList);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const viewFlist = nflist.map((v, i) => {
    return (
      <div className="Down" key={i}>
        {v.image && <img src={v.image} alt="preview-img" />}
        {v.nforiname}
      </div>
    );
  });

  const [fileName, setFileName] = useState("선택한 파일이 없습니다");

  const formData = new FormData();

  const onFileChange = useCallback(
    (e) => {
      const files = e.target.files;
      let fnames = "";

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
        fnames += files[i].name + " ";
      }
      if (fnames === "") {
        fnames = "선택한 파일이 없습니다.";
      }
      setFileName(fnames);
    },
    [formData]
  );

  const onCh = useCallback(
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
      e.preventDefault();

      formData.append(
        "data",
        newBlob([JSON.stringify(data)], { type: "appliscation/json" })
      );

      axios
        .post("/writeProc", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.data === "ok") {
            alert("수정 완료");
            nav("/notice");
          } else {
            alert("수정 실패");
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
    <div className="Main">
      <form className="Content" onSubmit={onWrite}>
        <h1>공지사항</h1>
        <input
          className="Input"
          name="ntitle"
          value={ntitle}
          placeholder="제목"
          onChange={onCh}
          autoFocus
          required
        />
        <textarea
          className="Textarea"
          name="ncontent"
          onChange={onCh}
          placeholder="내용을 작성하세요."
          value={ncontent}
        ></textarea>
        <div className="Box">
          <div className="FileTitle">파일 목록</div>
          <div className="FileData">{viewFlist}</div>
        </div>

        <div className="FileInput">
          <input id="upload" type="file" multiple onChange={onFileChange} />
          <label className="FileLabel" htmlFor="upload">
            파일 첨부
          </label>
          <span className="FileSpan">{fileName}</span>
        </div>

        <div className="Buttons">
          <Button
            type="button"
            size="small"
            w-size="s-20"
            outline
            onClick={() => nav("/notice", { state: { nn: data.nnum } })}
          >
            뒤로 가기
          </Button>
          <Button type="submit" size="small" wsize="s-20">
            등록
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Nupdate;
