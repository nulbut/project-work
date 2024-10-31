import axios from "axios";
import React, { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../idealcup/Button";
import { AdminPageContextStore } from "./AdminPageStatus";
import NoticeList from "./NoticeList";

const Nwrite = (props) => {
  //const nav = useNavigate();
  const pageSt = useContext(AdminPageContextStore);

  const [data, setData] = useState({
    ntitle: "",
    ncontent: "",
  });

  const { ntitle, ncontent } = data;
  const [fileName, setFileName] = useState("선택한 파일이 없습니다.");
  const [files, setFiles] = useState([]);

  //let formData = new FormData();

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

  const onPinCk = useCallback(() => {
    alert("상단에 고정합니다.");
    const dataObj = {
      ...data,
      isPinned: 1,
    };
    setData(dataObj);
  });

  const onFileChange = useCallback((e) => {
    const nfiles = e.target.files;
    let fnames = "";

    console.log(e.target.files);
    setFiles(e.target.files);

    for (let i = 0; i < nfiles.length; i++) {
      //formData.append("files", nfiles[i]);
      fnames += nfiles[i].name + " ";
    }
    if (fnames === "") {
      fnames = "선택한 파일이 없습니다.";
    }
    setFileName(fnames);
  }, []);

  const onWrite = useCallback(
    (e) => {
      e.preventDefault();

      const formData = new FormData();
      console.log(files);

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      formData.append(
        "data",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );
      for (let key of formData.keys()) {
        console.log(key);
      }

      axios
        .post("/admin/writeProc", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.data === "ok") {
            alert("등록되었습니다.");
            // nav("/notice");
            viewChange();
          } else {
            alert("등록 실패");
          }
        })
        .catch((err) => {
          alert("전송 실패");
          console.log(err);
        });
    },
    [data, files]
  );

  const viewChange = () => {
    console.log("nwrite viewchange");
    pageSt.setViewPage(<NoticeList />);
  };

  return (
    <>
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
          placeholder="공지사항을 작성하세요"
          value={ncontent}
        ></textarea>

        <div className="FileInput">
          <input id="upload" type="file" multiple onChange={onFileChange} />
          <label className="FileLabel" htmlFor="upload">
            파일 첨부
          </label>
          <span className="FileSpan">{fileName}</span>
        </div>

        <div className="Buttons">
          <Button type="button" size="small" w-size="s-50" onClick={viewChange}>
            취소
          </Button>
          <Button type="button" size="small" wsize="s-50" onClick={onPinCk}>
            상단고정
          </Button>
          <Button type="submit" size="small" wsize="s-50">
            등록
          </Button>
        </div>
      </form>
    </>
  );
};

export default Nwrite;
