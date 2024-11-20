import React from "react";
import CryptoJS from "crypto-js";
import Button from "./Button";

const ShareButton = ({ name, expl, code }) => {
  const encryptData = (data) => {
    const secretKey = "your_secret_key"; // 비밀 키
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  };

  const gameState = { name: name, expl: expl, code: code };
  const encryptedState = encryptData(gameState);
  const shareUrl = `localhost/game?data=${encodeURIComponent(encryptedState)}`;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        alert("URL이 클립보드에 복사되었습니다!");
      })
      .catch((err) => {
        console.error("복사 실패:", err);
      });
  };

  return (
    <Button wsize="s-25" onClick={copyToClipboard}>
      공유
    </Button>
  );
};

export default ShareButton;
