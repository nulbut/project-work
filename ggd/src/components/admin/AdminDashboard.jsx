import React, { useEffect, useState } from "react";
import MyResponsivePie from "./MyResponsivePie";
import MyResponsiveLine from "./MyResponsiveLine";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminDashboard = () => {
  const [dataPie, setDataPie] = useState();
  const [dataLine, setDataLine] = useState();
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
        <div className="col-xl-6">
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-chart-area me-1"></i>
              Area Chart Example
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
              Bar Chart Example
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
