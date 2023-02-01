import React from "react";
import EnterSidebar from "./EnterSidebar";
import { Outlet } from "react-router-dom";
import LoginHeader from "./LoginHeader";
function UserEnter() {
  return (
    <div className="mm-authenticate">
      <EnterSidebar />
      <section>
        <LoginHeader />
        <Outlet />
      </section>
    </div>
  );
}

export default UserEnter;
