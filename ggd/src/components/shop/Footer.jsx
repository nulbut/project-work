import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"; // 이메일 아이콘 추가
import "./scss/Footer.scss";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="text">
        ICIA | PROJECT
        <br />
        저자: 권수정, 종환선, 임하나, 김동훈, 김광래
        <br />
        이메일:{" "}
        <a href="mailto:email@icia.co.kr" style={{ color: "white" }}>
          email@icia.co.kr
        </a>
        <br />
        Copyright© 2024. redrabbit. All Rights Reserved.
      </div>

      {/* 아이콘 영역 */}
      <div className="footer-icons">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="mailto:email@icia.co.kr">
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
