import React from "react";
import IdlecupHeader from "./IdlecupHeader";
import IdlecupFooter from "./IdlecupFooter";
import { Outlet } from "react-router-dom";

const IdlecupLayout = () => {
  return (
    <div>
      <IdlecupHeader />
      <Outlet />
      <IdlecupFooter />
    </div>
  );
};

export default IdlecupLayout;
