import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminPageContextStore } from "./AdminPageStatus";
import DmList from "./DmList";

const Directmessage = () => {
  const nav = useNavigate();
  const pageSt = useContext(AdminPageContextStore);

  useEffect(() => {
    pageSt.setViewPage(<DmList />);
  }, []);

  const buttons = [
    {
      name: "답변하기",
    },
  ];

  const viewChange = () => {
    console.log("viewChange");
    pageSt.setViewPage(<DmList />);
  };

  return <div className="Main">{pageSt.viewPage}</div>;
};

export default Directmessage;
