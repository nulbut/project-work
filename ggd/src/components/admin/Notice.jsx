import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NoticeList from "./NoticeList";
import { AdminPageContextStore } from "./AdminPageStatus";

const Notice = () => {
  const nav = useNavigate();
  const pageSt = useContext(AdminPageContextStore);

  //const [viewName, setViewName] = useState(<NoticeList viewChange={viewChange}/>);
  // const aid = sessionStorage.getItem("mid");
  useEffect(() => {
    pageSt.setViewPage(<NoticeList />);
  },[]);

  const buttons = [
    {
      name: "등록",
      // path: "/UserListPage",
      // Element: UserList,
    },
  ];

  const viewChange = () => {
    console.log("viewChange");
    pageSt.setViewPage(<NoticeList />);
  };

  // const moveMenu = () => {
  //   setViewName(<Nwrite viewChange={viewChange} />);
  // };

  return <div className="Main">{pageSt.viewPage}</div>;
};

export default Notice;
