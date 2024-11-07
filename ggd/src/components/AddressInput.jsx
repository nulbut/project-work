import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { useForm } from "react-hook-form";

const AddressInput = () => {
  const [zonecode, setZonecode] = useState("");
  const [address, setAddress] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  //입력값 유효성 체크를 위한 useForm 사용
  const {
    register,
    formState: { errors },
  } = useForm();

  // 테마
  const themeObj = {
    bgColor: "#ECECEC", // 바탕 배경색
    searchBgColor: "#FFFFFF", // 검색창 배경색
    contentBgColor: "#FFFFFF", // 본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
    pageBgColor: "#FAFAFA", // 페이지 배경색
    textColor: "#333333", // 기본 글자색
    queryTextColor: "#222222", // 검색창 글자색
    postcodeTextColor: "#FA4256", // 우편번호 글자색
    emphTextColor: "#008BD3", // 강조 글자색
    outlineColor: "#E0E0E0", // 테두리
  };

  const style = {
    width: "400px",
    height: "600px",
    border: "1.4px solid #333333",
  };

  const completeHandler = (data) => {
    const { zonecode, address } = data;
    setZonecode(zonecode);
    setAddress(address);
    setIsOpen(false); // 검색 완료 후 창 닫기
  };

  const closeHandler = (state) => {
    if (state === "FORCE_CLOSE" || state === "COMPLETE_CLOSE") {
      setIsOpen(false);
    }
  };

  const toggleHandler = () => {
    setIsOpen((prevOpenState) => !prevOpenState);
  };

  const inputChangeHandler = (event) => {
    setDetailedAddress(event.target.value);
  };

  return (
    <div>
      <div>
        <div>
          <div>우편번호</div>
          <div>
            <input placeholder="우편번호" name="zonecode" value={zonecode} />
          </div>
          <button type="button" onClick={toggleHandler}>
            주소찾기
          </button>
        </div>
        {isOpen && (
          <div>
            <DaumPostcode
              theme={themeObj}
              style={style}
              onComplete={completeHandler}
              onClose={closeHandler}
            />
          </div>
        )}
        <div>주소</div>
        <div>
          <input placeholder="주소 입력" name="address" value={address} />
        </div>
        <div>상세주소</div>
        <input
          type="text"
          placeholder="상세 주소 입력"
          className="input"
          name="inputChangeHandler"
          value={detailedAddress}
          onChange={inputChangeHandler}
        />
      </div>
    </div>
  );
};

export default AddressInput;
