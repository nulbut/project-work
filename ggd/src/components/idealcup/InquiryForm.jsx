import React, { useState } from "react";
import "./scss/InquiryForm.scss";

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!formData.name || !formData.email || !formData.message) {
      setError("모든 필드를 채워주세요.");
      return;
    }

    // 서버로 데이터 전송 (예시)
    // 예시: sendInquiryToServer(formData)

    // 성공 메시지 출력
    setSuccessMessage("문의사항이 성공적으로 제출되었습니다.");
    setFormData({ name: "", email: "", message: "" }); // 폼 리셋
    setError(null); // 에러 초기화
  };

  return (
    <div className="inquiry-form">
      <h2>문의사항 보내기</h2>

      {/* 성공 메시지 */}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {/* 에러 메시지 */}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="이름을 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일을 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">문의 내용</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="문의 내용을 입력하세요"
            required
          ></textarea>
        </div>

        <button type="submit">문의하기</button>
      </form>
    </div>
  );
};

export default InquiryForm;
