import React, { useEffect, useState } from "react";
import MyResponsivePie from "./MyResponsivePie";
import MyResponsiveLine from "./MyResponsiveLine";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const AdminDashboard = () => {
  const [dataPie, setDataPie] = useState([]);
  const [dataLine, setDataLine] = useState([]);
  const [dashParams, setDashParams] = useState({
    cupTotalCnt: "",
    cupTodayCnt: "",
    cCnt: "",
  });
  const [dateChoose, setDateChoose] = useState();
  useEffect(() => {
    getIdealCnt();
  }, []);

  const getIdealCnt = async () => {
    try {
      axios
        .get("/getDashBoard")
        .then((res) => {
          setDashParams(res.data);
          const newData = [];
          for (let i = 0; i < res.data.cCnt.length; i++) {
            console.log(res.data.cCnt[i][0]);
            console.log(res.data.cCnt[i][1]);
            const newPie = {
              id: res.data.cCnt[i][0],
              label: res.data.cCnt[i][0],
              value: res.data.cCnt[i][1],
              color: "hsl(151, 70%, 50%)",
            };

            newData.push(newPie);
            // setDataPie((prev) => [...prev, newPie]);
          }
          setDataPie(newData);

          const newPeriodDatas = [];
          for (let i = 0; i < res.data.periodMakeCup.length; i++) {
            const newPeriodData = {
              x: res.data.periodMakeCup[i][0],
              y: res.data.periodMakeCup[i][1],
            };
            newPeriodDatas.push(newPeriodData);
          }
          setDataLine([
            {
              id: "일간 회원 가입 수",
              data: newPeriodDatas,
            },
            {
              id: "월간 회원 가입 수",
              data: newPeriodDatas,
            },
            {
              id: "연간 회원 가입 수",
              data: newPeriodDatas,
            },
          ]);

          console.log(newPeriodDatas);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log(dataLine);
  console.log(dashParams);
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Dashboard</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Dashboard</li>
      </ol>
      <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="card bg-primary text-white mb-4">
            <div className="card-body">인기 리스트</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <a className="small text-white stretched-link" href="#">
                View Details
              </a>
              <div className="small text-white">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card bg-success text-white mb-4">
            <div className="card-body">공지사항</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <a className="small text-white stretched-link" href="#">
                View Details
              </a>
              <div className="small text-white">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card bg-warning text-white mb-4">
            <div className="card-body">관리자 1:1 문의</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <a className="small text-white stretched-link" href="#">
                View Details
              </a>
              <div className="small text-white">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card bg-danger text-white mb-4">
            <div className="card-body">신고함</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <a className="small text-white stretched-link" href="#">
                View Details
              </a>
              <div className="small text-white">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="card bg-dark text-white mb-4">
            <div className="card-body">등록된 이상형 월드컵</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <a className="small text-white stretched-link" href="#">
                총 개수 : {dashParams.cupTotalCnt}
                <hr />
                오늘 등록된 개수 : {dashParams.cupTodayCnt}
              </a>
              <div className="small text-white">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card bg-dark text-white mb-4">
            <div className="card-body">등록된 회원 수</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <a className="small text-white stretched-link" href="#">
                총 회원 수 :{" "}
                {dashParams.bmemberTotalCnt + dashParams.nmemberTotalCnt}
                <hr />
                일반 회원 : {dashParams.nmemberTotalCnt}
                <div />
                사업자 회원 : {dashParams.bmemberTotalCnt}
                <hr />
                오늘 등록된 회원 :{" "}
                {dashParams.nmemberTodayCnt + dashParams.bmemberTodayCnt}
                <hr />
                일반 회원 : {dashParams.nmemberTodayCnt}
                <div />
                사업자 회원 : {dashParams.bmemberTodayCnt}
              </a>
              <div className="small text-white">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card bg-dark text-white mb-4">
            <div className="card-body">등록된 상품 수</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <a className="small text-white stretched-link" href="#">
                총 개수 : {dashParams.cupTotalCnt}
                <hr />
                오늘 등록된 개수 : {dashParams.cupTodayCnt}
              </a>
              <div className="small text-white">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card bg-dark text-white mb-4">
            <div className="card-body">등록된 이상형 월드컵</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <a className="small text-white stretched-link" href="#">
                총 개수 : {dashParams.cupTotalCnt}
                <hr />
                오늘 등록된 개수 : {dashParams.cupTodayCnt}
              </a>
              <div className="small text-white">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6">
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-chart-area me-1"></i>
              카테고리 점유율 Top 10
            </div>
            <div className="card-body">
              <MyResponsivePie data={dataPie} />
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="card mb-4">
            <div className="card-header">
              <FontAwesomeIcon icon={faChartBar} />
              기간 별 데이터 모음
            </div>
            <div className="card-body">
              <MyResponsiveLine data={dataLine} />
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1"></i>
          DataTable Example
        </div>
        <div className="card-body">
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
  );
};

export default AdminDashboard;
