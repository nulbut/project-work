import React, { useEffect, useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./scss/MemberSecession.scss";

const NMemberSecession = (props) => {
    const nav = useNavigate();

    const nid = sessionStorage.getItem("nid"); // 일반 회원 아이디 

    console.log(nid);

    const [check, setCheck] = useState("1");
  const cname = "1";

  //사업자 유저 정보 가져옴
  const [nmemberInfo, setNmemberInfo] = useState({
    nid: nid,
    nsituation: "사용중",
  });

  const { nsituation } = nmemberInfo;

  //체크 함수
  const checkItemHandler = (checked, itemid) => {
    console.log(itemid);
    let checkList = [];
    let si = cname;
    for (si of check) {
      if (si.cname == checked) {
        si.checked = itemid;
      }
      checkList.push(si);
    }
    setCheck(checkList);
    console.log(checkList);
  };

  //로그아웃 불러오기
  const onLogout = props.onLogout;
  

  //서버로부터 회원정보 받아오기
  useEffect(() => {
    axios
      .get("/getNMember", { params: { nid: nid } })
      .then((res) => {
        setNmemberInfo(res.data);
        //   console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //사업자회원 탈퇴 처리 

  const deleteNmember = (e) => {
    e.preventDefault();
    if (window.confirm("확인을 누르면 회원 정보가 삭제됩니다.")) {
        if (check == "1") {

          axios
            .get("/Ndeletemember", { params: { ncon: nid } })
            .then((res) => {
              if (res.data == "ok") {
                alert("GGD's 서비스를 이용해주셔서 감사합니다.");

                //로그아웃 호출
                if (onLogout) {
                    onLogout();
                }

                //홈으로 이동 
                nav("/");
                
              } else {
                alert("탈퇴 실패");
              }
            })
            .catch((err) => {
              alert("탈퇴 에러");
              console.log(err);
            });
        } else {
          alert("동의사항에 체크해주세요");
        }
      }
  }

  
  

  //취소버튼 누를 시 뒤로가기 됨
  const back = () => {
    nav(-1);
  };
    return (
        <div className="membersecession-main">
            <form className="membersecession-content">
        <div className="membersecession-reason">
          <h4>회원탈퇴 사유</h4>
          <hr />
          <div className="reason-button">
            <Button>아이디 변경</Button>
            <Button>개인정보 노출 우려</Button>
            <Button>거래 입/출금 서비스 불만</Button>
            <Button>시스템 에러 및 서비스 속도</Button>
            <Button>회원 혜택 부족</Button>
            <Button>고객 응대 부족</Button>
          </div>
          <div className="reason-text">
            <h5>개선사항</h5>
            <input type="textarea" />
          </div>
        </div>
        <div className="agreement">
          <p>
            개인정보 삭제 안내를 숙지해주시고,회원 탈퇴에
            대해 동의하여 주시기 바랍니다.
          </p>
          <input
            type="checkbox"
            name="checkbox"
            value={check}
            onClick={checkItemHandler}
          />
          위 내용을 모두 숙지하였으며, 이에 동의합니다.
        </div>
        <div className="secession-button">
          <Button onClick={back}>취소</Button>
          <Button onClick={deleteNmember}>확인</Button>
        </div>
        <div className="conment">
          <p>
            GGD's 서비스를 이용해주셔서 감사합니다. 더욱 더 개선하여 좋은
            서비스와 품질로 보답하겠습니다.
          </p>
        </div>
      </form>
        </div>
    );
};

export default NMemberSecession;