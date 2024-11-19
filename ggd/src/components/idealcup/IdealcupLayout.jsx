import React from "react";
import { Outlet } from "react-router-dom";
import "./scss/IdealcupLayout.scss";
import IdealcupHeader from "./IdealcupHeader";
import IdealcupFooter from "./IdealcupFooter";
import IdealcupSidebar from "./IdealcupSidebar";

const IdealcupLayout = (props) => {
  return (
    <div>
      <IdealcupHeader lstate={props.lstate} onLogout={props.onLogout} />
      <IdealcupSidebar />
      <div className="idealbody">
        <Outlet />
      </div>
      <IdealcupFooter />
    </div>
  );
};

export default IdealcupLayout;
