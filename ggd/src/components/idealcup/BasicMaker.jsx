import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./Button";

const BasicMaker = ({
  selectMenuHandler,
  data,
  setData,
  fileImage,
  setFileImage,
  formData,
}) => {
  const { iwcCode, iwcName, iwcExplanation, iwcGenre, iwcPublic } = data;
  const [fileName, setFileName] = useState([]);

  const nav = useNavigate();

  const onch = useCallback(
    (e) => {
      const dataObj = {
        ...data,
        [e.target.name]: e.target.value,
      };
      setData(dataObj);
      console.log(data);
    },
    [data]
  );

  //파일 선택 시 폼데이터에 파일 목록 추가(다중파일)
  const onFileChange = useCallback(
    (e) => {
      const files = e.target.files;
      let fnames = ""; //span에 출력할 파일명 목록

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
        setFileName((prev) => [...prev, files[i]]);
        setFileImage((prev) => [...prev, URL.createObjectURL(files[i])]);
        fnames += files[i].name + " ";
      }
      if (fnames === "") {
        fnames = "선택한 파일이 없습니다.";
      }

      console.log("파일", e.target.files);
      console.log("파일이름", fileName);
      for (const x of formData) {
        console.log("폼데이터", x);
      }
    },
    [formData]
  );

  //작성한 내용(제목, 글, 파일들) 전송 함수
  const onWrite = useCallback(
    (e) => {
      e.preventDefault(); //페이지 변환을 방지하는 함수.

      //전송 시 파일 이외의 데이터를 폼데이터에 추가
      formData.append(
        "data",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );

      axios
        .post("/writeProc", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.data !== "fail") {
            alert("작성 성공");
            data.iwcCode = res.data;
            selectMenuHandler(1);
          } else {
            alert("작성 실패");
          }
        })
        .catch((err) => {
          alert("전송 실패");
          console.log(err);
        });
    },
    [data]
  );
  console.log(fileName);

  return (
    <div>
      <form className="Content-iw" onSubmit={onWrite}>
        <table>
          <tr>
            <td>제목</td>
            <td>
              <input
                className="Input"
                name="iwcName"
                value={iwcName}
                placeholder="제목"
                onChange={onch}
                autoFocus
                required
              />
            </td>
          </tr>
          <tr>
            <td>설명</td>
            <td>
              <textarea
                className="Textarea"
                name="iwcExplanation"
                onChange={onch}
                placeholder="설명"
                value={iwcExplanation}
              />
            </td>
          </tr>
          <tr>
            <td>공개여부</td>
            <td className="radio-box">
              <label>
                {iwcPublic == 1 ? (
                  <input
                    type="radio"
                    value="0"
                    className="radio"
                    name="iwcPublic"
                    onChange={onch}
                    required
                    defaultChecked
                  />
                ) : (
                  <input
                    type="radio"
                    value="0"
                    className="radio"
                    name="iwcPublic"
                    onChange={onch}
                    required
                  />
                )}
                비공개
              </label>
              <div className="radio-ex">
                다른 사용자는 접근할 수 없습니다. 테스트 용으로 적합합니다.
              </div>
              <label>
                {iwcPublic == 1 ? (
                  <input
                    type="radio"
                    value="1"
                    className="radio"
                    name="iwcPublic"
                    onChange={onch}
                    defaultChecked
                  />
                ) : (
                  <input
                    type="radio"
                    value="1"
                    className="radio"
                    name="iwcPublic"
                    onChange={onch}
                  />
                )}
                공개
              </label>
              <div className="radio-ex">
                모든 사용자가 플레이 할 수 있습니다.
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <div className="FileInput">
                <input
                  id="upload"
                  type="file"
                  multiple
                  onChange={onFileChange}
                />

                <label className="FileLabel" htmlFor="upload">
                  파일선택
                </label>

                <span className="FileSpan">
                  {/* {fileName.map((e) => (
                    <div>{e.name}</div>
                  ))} */}
                  {fileImage.map((e) => (
                    <img style={{ width: "55px" }} src={e} />
                  ))}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <div className="Buttons">
                <Button
                  type="button"
                  size="large"
                  color="gray"
                  wsize="s-10"
                  outline
                  onClick={() => nav(-1)}
                >
                  돌아가기
                </Button>
                <Button type="submit" size="large" wsize="s-30">
                  저장 후 이름 수정
                </Button>
              </div>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default BasicMaker;
