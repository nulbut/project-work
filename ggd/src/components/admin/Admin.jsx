import React, { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useHistory,
  useNavigate,
} from "react-router-dom";
import "./scss/Admin.scss";
import Button from "../idealcup/Button";
import logo from "../images/logo.svg";
import UserList from "./UserList";
import Review from "./Review";
import Paging from "./Paging";
import Notice from "./Notice";
import Report from "./Report";

// function Admin() {
//   const history = useHistory();

//   const navigateToUserList = () => {
//     history.push('/UserListPage');
//   };

// const pnum = sessionStorage.getItem("pageNum");

// useEffect(() => {
//   // if (!admin) {
//   //     nav("/", { replace: true });
//   //     return; // 로그인 안한 경우 첫 화면으로 이동
//   // }
//   pnum !== null ? Admin(pnum) : Admin(1);
// }, []);

const Admin = () => {
  const navigate = useNavigate();
  const [viewName, setViewName] = useState(<UserList />);

  const buttons = [
    {
      name: "회원 목록",
      // path: "/UserListPage",
      // Element: UserList,
    },
    {
      name: "후기 관리",
      // path: "/",
    },
    {
      name: "댓글 관리",
      // path: "",
    },
    {
      name: "이상형 월드컵",
    },
    {
      name: "카테고리",
    },
    {
      name: "신고함",
    },
    {
      name: "공지사항",
    },
    {
      name: "1 : 1 문의",
    },
  ];

  const moveMenu = (menu) => {
    // alert(menu);
    switch (menu) {
      case "회원 목록":
        setViewName(<UserList />);
        break;
      case "후기 관리":
        setViewName(<Review />);
        break;
      case "신고함":
        setViewName(<Report />);
        break;
      case "공지사항":
        setViewName(<Notice />);
        break;
    }
  };
  return (
    <div className="admin">
      <div className="sideber">
        <div className="adminpage">
          <p>
            admin
            <img src={logo} />
          </p>
        </div>
        <div className="border-ber">
          {buttons.map((butn, idx) => {
            return (
              <Link className="sideber-menu" to={butn.path} key={idx}>
                <Button
                  size="large"
                  color="black"
                  onClick={() => moveMenu(butn.name)}
                >
                  {butn.name}
                </Button>
              </Link>
            );
          })}
          <div className="btn">
            <Button size="large" color="black">
              로그아웃
            </Button>
          </div>
        </div>
        <Outlet />
      </div>
      <div className="desc">{viewName}</div>
    </div>
  );
};

export default Admin;
