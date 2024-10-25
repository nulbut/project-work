import React, { useEffect, useState } from "react";
import "./scss/styles.scss";
import MyResponsivePie from "./MyResponsivePie";
import MyResponsiveLine from "./MyResponsiveLine";
import UserList from "./UserList";
import Review from "./Review";
import Category from "./Category";

const AdminEx = ({ data }) => {
  const [dataPie, setDataPie] = useState();
  const [dataLine, setDataLine] = useState();
  const [viewName, setViewName] = useState(<UserList />);

  const buttons = [
    {
      depth: "회원 관리",
      content: [
        { name: "회원 정보" },
        { name: "휴면 회원" },
        { name: "탈퇴 회원" },
      ],
      // path: "/UserListPage",
      // Element: UserList,
    },
    {
      depth: "상품 관리",
      content: [
        { name: "상품 리스트" },
        { name: "중고 상품 리스트" },
        { name: "상품 분류 관리" },
      ],
    },
    {
      depth: "게시판 관리",
      content: [
        {
          name: "상점 게시물 관리",
          detail: [
            { name: "후기관리" },
            { name: "신고함" },
            { name: "1 : 1 문의" },
          ],
        },
        { name: "공지사항" },
        { name: "댓글 관리" },
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
    // alert(menu);
    switch (menu) {
      case "회원 목록":
        setViewName(<UserList />);
        break;
      case "후기 관리":
        setViewName(<Review />);
        break;
      case "카테고리":
        setViewName(<Category />);
        break;
    }
  };

  useEffect(() => {
    setDataPie([
      {
        id: "php",
        label: "php",
        value: 502,
        color: "hsl(151, 70%, 50%)",
      },
      {
        id: "erlang",
        label: "erlang",
        value: 103,
        color: "hsl(280, 70%, 50%)",
      },
      {
        id: "stylus",
        label: "stylus",
        value: 216,
        color: "hsl(218, 70%, 50%)",
      },
      {
        id: "scala",
        label: "scala",
        value: 148,
        color: "hsl(194, 70%, 50%)",
      },
      {
        id: "hack",
        label: "hack",
        value: 60,
        color: "hsl(109, 70%, 50%)",
      },
    ]);

    setDataLine([
      {
        id: "japan",
        color: "hsl(55, 70%, 50%)",
        data: [
          {
            x: "plane",
            y: 1,
          },
          {
            x: "helicopter",
            y: 102,
          },
          {
            x: "boat",
            y: 192,
          },
          {
            x: "train",
            y: 290,
          },
          {
            x: "subway",
            y: 153,
          },
          {
            x: "bus",
            y: 286,
          },
          {
            x: "car",
            y: 69,
          },
          {
            x: "moto",
            y: 261,
          },
          {
            x: "bicycle",
            y: 222,
          },
          {
            x: "horse",
            y: 120,
          },
          {
            x: "skateboard",
            y: 50,
          },
          {
            x: "others",
            y: 64,
          },
        ],
      },
      {
        id: "france",
        color: "hsl(297, 70%, 50%)",
        data: [
          {
            x: "plane",
            y: 86,
          },
          {
            x: "helicopter",
            y: 104,
          },
          {
            x: "boat",
            y: 278,
          },
          {
            x: "train",
            y: 223,
          },
          {
            x: "subway",
            y: 241,
          },
          {
            x: "bus",
            y: 118,
          },
          {
            x: "car",
            y: 252,
          },
          {
            x: "moto",
            y: 65,
          },
          {
            x: "bicycle",
            y: 75,
          },
          {
            x: "horse",
            y: 71,
          },
          {
            x: "skateboard",
            y: 234,
          },
          {
            x: "others",
            y: 294,
          },
        ],
      },
      {
        id: "us",
        color: "hsl(165, 70%, 50%)",
        data: [
          {
            x: "plane",
            y: 66,
          },
          {
            x: "helicopter",
            y: 142,
          },
          {
            x: "boat",
            y: 184,
          },
          {
            x: "train",
            y: 81,
          },
          {
            x: "subway",
            y: 23,
          },
          {
            x: "bus",
            y: 172,
          },
          {
            x: "car",
            y: 105,
          },
          {
            x: "moto",
            y: 217,
          },
          {
            x: "bicycle",
            y: 163,
          },
          {
            x: "horse",
            y: 37,
          },
          {
            x: "skateboard",
            y: 202,
          },
          {
            x: "others",
            y: 68,
          },
        ],
      },
      {
        id: "germany",
        color: "hsl(295, 70%, 50%)",
        data: [
          {
            x: "plane",
            y: 6,
          },
          {
            x: "helicopter",
            y: 100,
          },
          {
            x: "boat",
            y: 67,
          },
          {
            x: "train",
            y: 5,
          },
          {
            x: "subway",
            y: 212,
          },
          {
            x: "bus",
            y: 282,
          },
          {
            x: "car",
            y: 88,
          },
          {
            x: "moto",
            y: 230,
          },
          {
            x: "bicycle",
            y: 58,
          },
          {
            x: "horse",
            y: 169,
          },
          {
            x: "skateboard",
            y: 211,
          },
          {
            x: "others",
            y: 122,
          },
        ],
      },
      {
        id: "norway",
        color: "hsl(174, 70%, 50%)",
        data: [
          {
            x: "plane",
            y: 156,
          },
          {
            x: "helicopter",
            y: 46,
          },
          {
            x: "boat",
            y: 90,
          },
          {
            x: "train",
            y: 156,
          },
          {
            x: "subway",
            y: 118,
          },
          {
            x: "bus",
            y: 52,
          },
          {
            x: "car",
            y: 80,
          },
          {
            x: "moto",
            y: 172,
          },
          {
            x: "bicycle",
            y: 261,
          },
          {
            x: "horse",
            y: 237,
          },
          {
            x: "skateboard",
            y: 215,
          },
          {
            x: "others",
            y: 266,
          },
        ],
      },
    ]);
  }, []);

  return (
    <div>
      <body class="sb-nav-fixed">
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          {/* <!-- Navbar Brand--> */}
          <a class="navbar-brand ps-3" href="index.html">
            관리자 페이지
          </a>
          {/* <!-- Sidebar Toggle--> */}
          <button
            class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
            id="sidebarToggle"
            href="#!"
          >
            <i class="fas fa-bars"></i>
          </button>
          {/* <!-- Navbar Search--> */}
          <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div class="input-group">
              <input
                class="form-control"
                type="text"
                placeholder="Search for..."
                aria-label="Search for..."
                aria-describedby="btnNavbarSearch"
              />
              <button
                class="btn btn-primary"
                id="btnNavbarSearch"
                type="button"
              >
                <i class="fas fa-search"></i>
              </button>
            </div>
          </form>
          {/* <!-- Navbar--> */}
          <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                id="navbarDropdown"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fas fa-user fa-fw"></i>
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <a class="dropdown-item" href="#!">
                    Settings
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#!">
                    Activity Log
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a class="dropdown-item" href="#!">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav
              class="sb-sidenav accordion sb-sidenav-dark"
              id="sidenavAccordion"
            >
              <div class="sb-sidenav-menu">
                {buttons.map((el) => {
                  const first = el.content;
                  const second = el.depth;
                  console.log(first);
                  return (
                    <div class="nav">
                      <div class="sb-sidenav-menu-heading"></div>
                      <a class="nav-link" href="index.html">
                        <div class="sb-nav-link-icon">
                          <i class="fas fa-tachometer-alt"></i>
                        </div>
                        Dashboard
                      </a>
                      <div class="sb-sidenav-menu-heading">상품 관리</div>
                      <a
                        class="nav-link collapsed"
                        href="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseLayouts"
                        aria-expanded="false"
                        aria-controls="collapseLayouts"
                      >
                        <div class="sb-nav-link-icon">
                          <i class="fas fa-columns"></i>
                        </div>
                        Layouts
                        <div class="sb-sidenav-collapse-arrow">
                          <i class="fas fa-angle-down"></i>
                        </div>
                      </a>
                      <div
                        class="collapse"
                        id="collapseLayouts"
                        aria-labelledby="headingOne"
                        data-bs-parent="#sidenavAccordion"
                      >
                        <nav class="sb-sidenav-menu-nested nav">
                          <a class="nav-link" href="layout-static.html">
                            Static Navigation
                          </a>
                          <a class="nav-link" href="layout-sidenav-light.html">
                            Light Sidenav
                          </a>
                        </nav>
                      </div>
                      <a
                        class="nav-link collapsed"
                        href="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsePages"
                        aria-expanded="false"
                        aria-controls="collapsePages"
                      >
                        <div class="sb-nav-link-icon">
                          <i class="fas fa-book-open"></i>
                        </div>
                        Pages
                        <div class="sb-sidenav-collapse-arrow">
                          <i class="fas fa-angle-down"></i>
                        </div>
                      </a>
                      <div
                        class="collapse"
                        id="collapsePages"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#sidenavAccordion"
                      >
                        <nav
                          class="sb-sidenav-menu-nested nav accordion"
                          id="sidenavAccordionPages"
                        >
                          <a
                            class="nav-link collapsed"
                            href="#"
                            data-bs-toggle="collapse"
                            data-bs-target="#pagesCollapseAuth"
                            aria-expanded="false"
                            aria-controls="pagesCollapseAuth"
                          >
                            Authentication
                            <div class="sb-sidenav-collapse-arrow">
                              <i class="fas fa-angle-down"></i>
                            </div>
                          </a>
                          <div
                            class="collapse"
                            id="pagesCollapseAuth"
                            aria-labelledby="headingOne"
                            data-bs-parent="#sidenavAccordionPages"
                          >
                            <nav class="sb-sidenav-menu-nested nav">
                              <a class="nav-link" href="login.html">
                                Login
                              </a>
                              <a class="nav-link" href="register.html">
                                Register
                              </a>
                              <a class="nav-link" href="password.html">
                                Forgot Password
                              </a>
                            </nav>
                          </div>
                          <a
                            class="nav-link collapsed"
                            href="#"
                            data-bs-toggle="collapse"
                            data-bs-target="#pagesCollapseError"
                            aria-expanded="false"
                            aria-controls="pagesCollapseError"
                          >
                            Error
                            <div class="sb-sidenav-collapse-arrow">
                              <i class="fas fa-angle-down"></i>
                            </div>
                          </a>
                          <div
                            class="collapse"
                            id="pagesCollapseError"
                            aria-labelledby="headingOne"
                            data-bs-parent="#sidenavAccordionPages"
                          >
                            <nav class="sb-sidenav-menu-nested nav">
                              <a class="nav-link" href="401.html">
                                401 Page
                              </a>
                              <a class="nav-link" href="404.html">
                                404 Page
                              </a>
                              <a class="nav-link" href="500.html">
                                500 Page
                              </a>
                            </nav>
                          </div>
                        </nav>
                      </div>
                      <div class="sb-sidenav-menu-heading">Addons</div>
                      <a class="nav-link" href="charts.html">
                        <div class="sb-nav-link-icon">
                          <i class="fas fa-chart-area"></i>
                        </div>
                        Charts
                      </a>
                      <a class="nav-link" href="tables.html">
                        <div class="sb-nav-link-icon">
                          <i class="fas fa-table"></i>
                        </div>
                        Tables
                      </a>
                    </div>
                  );
                })}
              </div>
              <div class="sb-sidenav-menu">
                <div class="nav">
                  <div class="sb-sidenav-menu-heading">회원 관리</div>
                  <a class="nav-link" href="index.html">
                    <div class="sb-nav-link-icon">
                      <i class="fas fa-tachometer-alt"></i>
                    </div>
                    Dashboard
                  </a>
                  <div class="sb-sidenav-menu-heading">상품 관리</div>
                  <a
                    class="nav-link collapsed"
                    href="#"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseLayouts"
                    aria-expanded="false"
                    aria-controls="collapseLayouts"
                  >
                    <div class="sb-nav-link-icon">
                      <i class="fas fa-columns"></i>
                    </div>
                    Layouts
                    <div class="sb-sidenav-collapse-arrow">
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    class="collapse"
                    id="collapseLayouts"
                    aria-labelledby="headingOne"
                    data-bs-parent="#sidenavAccordion"
                  >
                    <nav class="sb-sidenav-menu-nested nav">
                      <a class="nav-link" href="layout-static.html">
                        Static Navigation
                      </a>
                      <a class="nav-link" href="layout-sidenav-light.html">
                        Light Sidenav
                      </a>
                    </nav>
                  </div>
                  <a
                    class="nav-link collapsed"
                    href="#"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsePages"
                    aria-expanded="false"
                    aria-controls="collapsePages"
                  >
                    <div class="sb-nav-link-icon">
                      <i class="fas fa-book-open"></i>
                    </div>
                    Pages
                    <div class="sb-sidenav-collapse-arrow">
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    class="collapse"
                    id="collapsePages"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#sidenavAccordion"
                  >
                    <nav
                      class="sb-sidenav-menu-nested nav accordion"
                      id="sidenavAccordionPages"
                    >
                      <a
                        class="nav-link collapsed"
                        href="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#pagesCollapseAuth"
                        aria-expanded="false"
                        aria-controls="pagesCollapseAuth"
                      >
                        Authentication
                        <div class="sb-sidenav-collapse-arrow">
                          <i class="fas fa-angle-down"></i>
                        </div>
                      </a>
                      <div
                        class="collapse"
                        id="pagesCollapseAuth"
                        aria-labelledby="headingOne"
                        data-bs-parent="#sidenavAccordionPages"
                      >
                        <nav class="sb-sidenav-menu-nested nav">
                          <a class="nav-link" href="login.html">
                            Login
                          </a>
                          <a class="nav-link" href="register.html">
                            Register
                          </a>
                          <a class="nav-link" href="password.html">
                            Forgot Password
                          </a>
                        </nav>
                      </div>
                      <a
                        class="nav-link collapsed"
                        href="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#pagesCollapseError"
                        aria-expanded="false"
                        aria-controls="pagesCollapseError"
                      >
                        Error
                        <div class="sb-sidenav-collapse-arrow">
                          <i class="fas fa-angle-down"></i>
                        </div>
                      </a>
                      <div
                        class="collapse"
                        id="pagesCollapseError"
                        aria-labelledby="headingOne"
                        data-bs-parent="#sidenavAccordionPages"
                      >
                        <nav class="sb-sidenav-menu-nested nav">
                          <a class="nav-link" href="401.html">
                            401 Page
                          </a>
                          <a class="nav-link" href="404.html">
                            404 Page
                          </a>
                          <a class="nav-link" href="500.html">
                            500 Page
                          </a>
                        </nav>
                      </div>
                    </nav>
                  </div>
                  <div class="sb-sidenav-menu-heading">Addons</div>
                  <a class="nav-link" href="charts.html">
                    <div class="sb-nav-link-icon">
                      <i class="fas fa-chart-area"></i>
                    </div>
                    Charts
                  </a>
                  <a class="nav-link" href="tables.html">
                    <div class="sb-nav-link-icon">
                      <i class="fas fa-table"></i>
                    </div>
                    Tables
                  </a>
                </div>
              </div>
              <div class="sb-sidenav-footer">
                <div class="small">Logged in as:</div>
                Start Bootstrap
              </div>
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div class="container-fluid px-4">
                <h1 class="mt-4">Dashboard</h1>
                <ol class="breadcrumb mb-4">
                  <li class="breadcrumb-item active">Dashboard</li>
                </ol>
                <div class="row">
                  <div class="col-xl-3 col-md-6">
                    <div class="card bg-primary text-white mb-4">
                      <div class="card-body">Primary Card</div>
                      <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="small text-white stretched-link" href="#">
                          View Details
                        </a>
                        <div class="small text-white">
                          <i class="fas fa-angle-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-md-6">
                    <div class="card bg-warning text-white mb-4">
                      <div class="card-body">Warning Card</div>
                      <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="small text-white stretched-link" href="#">
                          View Details
                        </a>
                        <div class="small text-white">
                          <i class="fas fa-angle-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-md-6">
                    <div class="card bg-success text-white mb-4">
                      <div class="card-body">Success Card</div>
                      <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="small text-white stretched-link" href="#">
                          View Details
                        </a>
                        <div class="small text-white">
                          <i class="fas fa-angle-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-md-6">
                    <div class="card bg-danger text-white mb-4">
                      <div class="card-body">Danger Card</div>
                      <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="small text-white stretched-link" href="#">
                          View Details
                        </a>
                        <div class="small text-white">
                          <i class="fas fa-angle-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xl-6">
                    <div class="card mb-4">
                      <div class="card-header">
                        <i class="fas fa-chart-area me-1"></i>
                        Area Chart Example
                      </div>
                      <div class="card-body">
                        <div className>
                          <MyResponsivePie data={dataPie} />
                          123
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <div class="card mb-4">
                      <div class="card-header">
                        <i class="fas fa-chart-bar me-1"></i>
                        <MyResponsiveLine data={dataLine} />
                        Bar Chart Example
                      </div>
                      <div class="card-body">
                        <canvas
                          id="myBarChart"
                          width="100%"
                          height="40"
                        ></canvas>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card mb-4">
                  <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    DataTable Example
                  </div>
                  <div class="card-body">
                    <table id="datatablesSimple">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Position</th>
                          <th>Office</th>
                          <th>Age</th>
                          <th>Start date</th>
                          <th>Salary</th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          <th>Name</th>
                          <th>Position</th>
                          <th>Office</th>
                          <th>Age</th>
                          <th>Start date</th>
                          <th>Salary</th>
                        </tr>
                      </tfoot>
                      <tbody>
                        <tr>
                          <td>Tiger Nixon</td>
                          <td>System Architect</td>
                          <td>Edinburgh</td>
                          <td>61</td>
                          <td>2011/04/25</td>
                          <td>$320,800</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </main>
            <footer class="py-4 bg-light mt-auto">
              <div class="container-fluid px-4">
                <div class="d-flex align-items-center justify-content-between small">
                  <div class="text-muted">
                    Copyright &copy; Your Website 2023
                  </div>
                  <div>
                    <a href="#">Privacy Policy</a>
                    &middot;
                    <a href="#">Terms &amp; Conditions</a>
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
