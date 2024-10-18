import React, { useCallback, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Button from "./Button";
import "./scss/FileInput.scss";
import "./scss/IdealcupWrite.scss";
import "./scss/IdealcupMaker.scss";
import BasicMaker from "./BasicMaker";
import { useNavigate } from "react-router-dom";

const IdealCupMaker = () => {
  const id = sessionStorage.getItem("nid");
  //탭 관련
  const [data, setData] = useState({
    iwcCode: "",
    iwcName: "",
    iwcExplanation: "",
    iwcAuthor: id,
    iwcGenre: "",
    iwcPublic: "1",
  });

  const nav = useNavigate();

  const [currentTab, clickTab] = useState(0);
  const selectMenuHandler = (index) => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    console.log(index);
    clickTab(index);
  };
  const menuArr = [
    {
      name: "1. 기본정보 입력 / 이미지 업로드",
      content: (
        <BasicMaker
          tab={currentTab}
          selectMenuHandler={selectMenuHandler}
          data={data}
          setData={setData}
        />
      ),
    },
    { name: "2. 이미지 이름 입력/수정/삭제", content: "Tab menu TWO" },
    // { name: "Tab3", content: "Tab menu THREE" },
  ];

  useEffect(() => {
    if (id === null) {
      nav("/login", { replace: true });
      return; //로그인 안한 경우 첫 화면으로 이동.
    }
  }, []);
  console.log(data);
  return (
    <div className="gameWrite">
      <div className="tabMenu">
        {menuArr.map((el, index) => (
          <li
            className={index === currentTab ? "submenu focused" : "submenu"}
            onClick={() => selectMenuHandler(index)}
          >
            {el.name}
          </li>
        ))}
      </div>
      <div className="desc">
        <p>{menuArr[currentTab].content}</p>
      </div>
    </div>
  );
};

export default IdealCupMaker;
