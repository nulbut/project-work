// src/components/CommentSection.jsx
import React, { useEffect, useState } from "react";
import "./scss/CommentSection.scss";
import axios from "axios";

const CommentSection = ({
  iwcCode,
  iwcContentsCode,
  iwcContentsCategory,
  iwcContentsName,
}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    // 댓글 데이터 가져오기
    axios
      .get("/getIwcComments", { params: { postId: iwcCode } })
      .then((response) => {
        console.log(response);
        setComments(response.data);
        setIsUpdate(false);
      })
      .catch((error) =>
        console.error("댓글을 가져오는 중 오류가 발생했습니다.", error)
      );
  }, [isUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 댓글 추가 요청
    const postForm = {
      iwcCode: iwcCode,
      userId: sessionStorage.getItem("nid"),
      iwcCommentContent: newComment,
      iwcContentsCode: iwcContentsCode,
      iwcContentsCategory: iwcContentsCategory,
      iwcContentsName: iwcContentsName,
    };

    axios
      .post("/setIwcComments", postForm)
      .then((response) => {
        setNewComment(""); // 입력 필드 초기화
        setIsUpdate(true);
        alert("댓글이 추가되었습니다.");
      })
      .catch((error) => console.error("댓글 추가 중 오류 발생", error));
  };
  console.log(newComment);

  const handleDelete = (commentId) => {
    // 댓글 삭제 요청 (API 호출)
    axios
      .delete(`/deleteIwcComment/${commentId}`)
      .then(() => {
        alert("댓글이 삭제되었습니다.");
        // 댓글 삭제 후 목록 새로고침 등
      })
      .catch((error) => {
        console.error("댓글 삭제 중 오류 발생", error);
      });
  };

  const handleReport = (commentId) => {
    // 댓글 신고 요청 (API 호출)
    axios
      .post(`/reportIwcComment`, { commentId })
      .then(() => {
        alert("댓글이 신고되었습니다.");
      })
      .catch((error) => {
        console.error("댓글 신고 중 오류 발생", error);
      });
  };
  return (
    <div className="commentSection">
      <form onSubmit={handleSubmit} className="commentForm">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 남겨주세요"
          className="commentInput"
        />
        <button type="submit" className="commentButton">
          작성
        </button>
      </form>
      <div className="commentsList">
        {comments.length === 0 ? (
          <p>댓글이 없습니다.</p>
        ) : (
          <ul>
            {comments.map((comment, index) => (
              <div key={comment.iwcCommentId} className="comment">
                <div className="comment-header">
                  <strong>
                    {comment.userId} - ({comment.iwcContentsName})
                  </strong>{" "}
                  {/* 닉네임 */}
                  <span className="timestamp">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="comment-body">
                  {comment.iwcCommentContent} {/* 댓글 내용 */}
                </div>
                <div className="comment-actions">
                  {comment.userId === sessionStorage.getItem("nid") ? (
                    <button onClick={() => handleDelete(comment.iwcCommentId)}>
                      삭제
                    </button>
                  ) : (
                    <button onClick={() => handleReport(comment.iwcCommentId)}>
                      신고
                    </button>
                  )}
                </div>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
