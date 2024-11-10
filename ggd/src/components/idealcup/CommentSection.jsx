// src/components/CommentSection.jsx
import React, { useState } from "react";
import "./scss/CommentSection.scss";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="commentSection">
      <h2>댓글</h2>
      <div className="commentsList">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            {comment}
          </div>
        ))}
      </div>
      <form onSubmit={handleCommentSubmit} className="commentForm">
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
    </div>
  );
};

export default CommentSection;
