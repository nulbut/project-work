import React from "react";
import { Outlet } from "react-router-dom";
import "./scss/IdealcupLayout.scss";
import IdealcupHeader from "./IdealcupHeader";
import IdealcupFooter from "./IdealcupFooter";
import IdealcupSidebar from "./IdealcupSidebar";

const IdealcupLayout = () => {
  return (
    <div>
      <IdealcupHeader />
      <IdealcupSidebar />
      <div className="body">
        <Outlet />
      </div>
      <IdealcupFooter />
    </div>
  );
};

export default IdealcupLayout;
