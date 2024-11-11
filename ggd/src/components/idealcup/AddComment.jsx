import React, { useState } from "react";
import axios from "axios";

const AddComment = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // 댓글 추가 요청
    const newComment = {
      iwcCode,
      userId: 1,
      iwcCommentContent,
    };

    axios
      .post("/iwcComments", newComment)
      .then((response) => {
        setContent(""); // 입력 필드 초기화
        alert("댓글이 추가되었습니다.");
      })
      .catch((error) => console.error("댓글 추가 중 오류 발생", error));
  };

  return (
    <div>
      <h3>댓글 작성</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력하세요"
          required
        />
        <button type="submit">댓글 작성</button>
      </form>
    </div>
  );
};

export default AddComment;
