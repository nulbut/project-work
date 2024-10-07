import React from "react";
import IdlecupHeader from "./IdlecupHeader";
import IdlecupFooter from "./IdlecupFooter";
import { Outlet } from "react-router-dom";
import IdlecupSidebar from "./IdlecupSidebar";

const IdlecupLayout = () => {
  return (
    <div>
      <IdlecupHeader />
      <IdlecupSidebar />
      <Outlet />
      <IdlecupFooter />
    </div>
  );
};

export default IdlecupLayout;
