import React, { useEffect, useState } from "react";
import "./scss/styles.scss";
import UserList from "./UserList";
import Review from "./Review";
import Category from "./Category";
import AdminDashboard from "./AdminDashboard";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faBars,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const AdminEx = ({ data }) => {
  const [viewName, setViewName] = useState(<AdminDashboard />);
  const [state, setState] = useState(true);

  const buttons = [
    {
      depth: "회원 관리",
      content: [
        { name: "회원 정보 관리" },
        {
          name: "포인트 관리",
          target: "pointBoard",
          content2: [{ name: "포인트 내역" }, { name: "일괄 제공" }],
        },
      ],
      // path: "/UserListPage",
      // Element: UserList,
    },
    {
      depth: "상품 관리",
      content: [
        {
          name: "상품 리스트",
          target: "productBoard",
          content2: [
            { name: "사업자 상품 리스트" },
            { name: "중고 상품 리스트" },
          ],
        },
        { name: "상품 분류 관리" },
        { name: "주문 리스트" },
      ],
    },
    {
      depth: "이상형 월드컵 관리",
      content: [{ name: "월드컵 리스트" }, { name: "월드컵 게시물 관리" }],
    },
    {
      depth: "게시판/기타 관리",
      content: [
        {
          name: "상점 게시물 관리",
          target: "storeBoard",
          content2: [
            { name: "후기 관리" },
            { name: "1 : 1 문의" },
            { name: "댓글 관리" },
          ],
        },

        {
          name: "기타",
          target: "etcBoard",
          content2: [
            { name: "공지사항" },
            { name: "신고함" },
            { name: "관리자 1 : 1 문의" },
          ],
        },
      ],

      // path: "/",
    },
    // {
    //   name: "이상형 월드컵",
    // },
    // {
    //   name: "카테고리",
    // },
  ];

  const moveMenu = (menu) => {
    switch (menu) {
      case "회원 정보 관리":
        setViewName(<UserList />);
        break;
      case "후기 관리":
        setViewName(<Review />);
        break;
      case "카테고리":
        setViewName(<Category />);
        break;
      default:
        setViewName(<AdminDashboard />);
    }
    console.log(viewName);
  };

  const sidebarClick = () => {
    state === true ? setState(false) : setState(true);
  };
  return (
    <div>
      <body
        className={
          state === true ? "sb-nav-fixed" : "sb-nav-fixed sb-sidenav-toggled"
        }
      >
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          {/* <!-- Navbar Brand--> */}
          <div className="navbar-brand ps-3" onClick={() => moveMenu()}>
            관리자 페이지
          </div>
          {/* <!-- Sidebar Toggle--> */}
          <button
            onClick={sidebarClick}
            className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
            id="sidebarToggle"
            href="#!"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          {/* <!-- Navbar Search--> */}
          <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Search for..."
                aria-label="Search for..."
                aria-describedby="btnNavbarSearch"
              />
              <button
                className="btn btn-primary"
                id="btnNavbarSearch"
                type="button"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>
          </form>
          {/* <!-- Navbar--> */}
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
              <div
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={faUser} />
              </div>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <div className="dropdown-item" href="#!">
                    Settings
                  </div>
                </li>
                <li>
                  <div className="dropdown-item" href="#!">
                    Activity Log
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <div className="dropdown-item" href="#!">
                    Logout
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav
              className="sb-sidenav accordion sb-sidenav-dark"
              id="sidenavAccordion"
            >
              <div className="sb-sidenav-menu">
                {buttons.map((el) => {
                  return (
                    <div className="nav">
                      <div className="sb-sidenav-menu-heading">{el.depth}</div>
                      {el.content.map((el) => {
                        return (
                          <>
                            <div
                              className="nav-link collapsed"
                              onClick={
                                el.content2 == null
                                  ? () => moveMenu(el.name)
                                  : () => moveMenu()
                              }
                              data-bs-toggle="collapse"
                              data-bs-target={"#" + el.target}
                              aria-expanded="false"
                              aria-controls={el.target}
                            >
                              <div className="sb-nav-link-icon">
                                <i className="fas fa-book-open"></i>
                              </div>
                              {el.name}
                              {el.content2 && (
                                <div className="sb-sidenav-collapse-arrow">
                                  <FontAwesomeIcon icon={faAngleDown} />
                                </div>
                              )}
                            </div>
                            {el.content2 && (
                              <div
                                className="collapse"
                                id={el.target}
                                aria-labelledby="headingOne"
                                data-bs-parent="#sidenavAccordion"
                              >
                                <nav className="sb-sidenav-menu-nested nav">
                                  {el.content2?.map((el) => {
                                    return (
                                      <div
                                        className="nav-link"
                                        onClick={() => moveMenu(el.name)}
                                      >
                                        {el.name}
                                      </div>
                                    );
                                  })}
                                </nav>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                Start Bootstrap
              </div>
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <div className="desc">{viewName}</div>
            <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">
                    Copyright &copy; Your Website 2023
                  </div>
                  <div>
                    <div href="#">Privacy Policy</div>
                    &middot;
                    <div href="#">Terms &amp; Conditions</div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </div>
  );
};

export default AdminEx;
