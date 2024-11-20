import React, { useState } from "react";
import "./scss/ReportModal.scss"; // 스타일 파일 (추가 스타일링 필요)
import axios from "axios";

const ReportModal = ({ isOpen, onClose, onSubmit, item }) => {
  const [reportReason, setReportReason] = useState("");

  const [reportDescription, setReportDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 신고 사유 선택 핸들러
  const handleReasonChange = (event) => {
    setReportReason(event.target.value);
  };

  // 신고 설명 핸들러
  const handleDescriptionChange = (event) => {
    setReportDescription(event.target.value);
  };

  console.log(reportReason, reportDescription, isOpen, onClose, onSubmit, item);
  // 폼 제출 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (reportReason === "") {
      alert("신고 사유를 선택해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 신고 데이터를 서버로 제출하는 로직 (예시)
      // 예: axios.post('/report', { reason: reportReason, description: reportDescription })
      axios
        .get("/report", {
          params: {
            reason: reportReason,
            description: reportDescription,
            where: item.where,
            id: item.id,
            code: item.code,
          },
        })
        .then(() => {
          alert("신고 되었습니다.");
          onClose(setReportReason, setReportDescription);
        })
        .catch((err) => console.log(err));
      console.log("신고 제출", { reportReason, reportDescription });
      onSubmit(reportReason, reportDescription); // 부모 컴포넌트에 신고 제출 전달

      // 제출 후 라이트박스 닫기
    } catch (error) {
      console.error("신고 제출 오류:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음

  return (
    <div className="report-modal-overlay">
      <div className="report-modal-content">
        <div className="report-modal-header">
          <h2>신고하기</h2>
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reason">신고 사유</label>
            <select
              id="reason"
              value={reportReason}
              onChange={handleReasonChange}
              required
            >
              <option value="">-- 신고 사유 선택 --</option>
              <option value="inappropriate-content">부적절한 내용</option>
              <option value="spam">스팸</option>
              <option value="harassment">선정성</option>
              <option value="other">기타</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">상세 설명</label>
            <textarea
              id="description"
              value={reportDescription}
              onChange={handleDescriptionChange}
              placeholder="신고 사유에 대한 상세 설명을 적어주세요."
              rows="4"
            />
          </div>
          {item && item.name && (
            <div className="report-item-info">
              <p>
                신고자: <strong>{item.id}</strong>
              </p>
              <p>
                신고 대상: {item.where} - <strong>{item.name}</strong>
              </p>
            </div>
          )}
          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => onClose(setReportReason, setReportDescription)}
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "제출 중..." : "제출"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
