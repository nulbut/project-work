import React from "react";
import { Outlet } from "react-router-dom";

import IdealcupHeader from "./IdealcupHeader";
import IdealcupFooter from "./IdealcupFooter";
import IdealcupSidebar from "./IdealcupSidebar";

const IdealcupLayout = () => {
  return (
    <div>
      <IdealcupHeader />
      <IdealcupSidebar />
      <Outlet />
      <IdealcupFooter />
    </div>
  );
};

export default IdealcupLayout;
