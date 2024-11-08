import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import "../scss/ManageUserGrade.scss";
const ManageUserGrade = () => {
  const [formFields, setFormFields] = useState([
    { ugId: "1", ugName: "", ugDuration: "" },
  ]);

  const handleAddFields = () => {
    if (formFields.length < 10) {
      const values = [
        ...formFields,
        { ugId: formFields.length + 1 + "", ugName: "", ugDuration: "" },
      ];
      setFormFields(values);
    } else {
      alert("10개 까지만 등록 가능");
    }
  };

  const handleRemoveFields = (index) => {
    if (formFields.length === 1) {
      alert("At least one form must remain");
      return;
    }
    const values = [...formFields];
    values.splice(index, 1);
    for (let i = 0; i < values.length; i++) {
      values[i].ugId = i + 1;
    }
    setFormFields(values);
  };

  const handleInputChange = (index, e) => {
    const values = [...formFields];
    if (e.target.name === "name") {
      values[index].ugName = e.target.value;
    }
    // else if (e.target.name === "no") {
    //   values[index].ugId = e.target.value;
    // }
    else if (e.target.name == "value") {
      values[index].ugDuration = e.target.value;
    }
    setFormFields(values);
  };

  useEffect(() => {
    console.log("formFields changed:", formFields);
  }, [formFields]);

  useEffect(() => {
    axios
      .get("/admin/gradeList")
      .then((res) => {
        setFormFields(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleSubmit = useCallback(
    (e) => {
      console.log(typeof formFields);
      e.preventDefault();
      console.log("보냄");
      axios
        .post("/admin/writeGrade", formFields)
        .then((res) => {
          console.log(res);
          console.log("전송성공");
        })
        .catch((err) => {
          alert("전송 실패");
          console.log(err);
        });
    },
    [formFields]
  );

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <div key={index} className="form-field">
            <input
              type="text"
              placeholder="등급 명"
              name="no"
              value={field.ugId}
              onChange={(e) => handleInputChange(index, e)}
            />
            <input
              type="text"
              placeholder="등급 명"
              name="name"
              value={field.ugName}
              onChange={(e) => handleInputChange(index, e)}
            />
            <input
              type="text"
              placeholder="제한 일 수"
              name="value"
              value={field.ugDuration}
              onChange={(e) => handleInputChange(index, e)}
            />
            <button type="button" onClick={() => handleRemoveFields(index)}>
              삭제
            </button>
          </div>
        ))}
        <button type="button" className="add-button" onClick={handleAddFields}>
          등급 추가
        </button>
        <button type="submit" className="submit-button">
          저장
        </button>
      </form>
    </div>
  );
};

export default ManageUserGrade;
