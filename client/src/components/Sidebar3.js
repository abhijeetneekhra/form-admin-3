import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  let token = localStorage.getItem("token");
  const headers = { Authorization: "Bearer " + token };

  const handleChangeP = async (id, name) => {
    try {
      if (
        window.confirm(
          "Do you really want to change password? A link will be sent to your registered email Id"
        )
      ) {
        let userName = localStorage.getItem("userName");
        let userId = localStorage.getItem("userId");
        try {
          const { data } = await axios.post(
            "/api/v1/admin/sendmail",
            {
              name: userName,
              email: userId,
              link: "http://localhost:3000/passwordchange/" + userId,
            },
            { headers }
          );
          if (data.success) {
            toast.success("mail sent successfully");
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`app`} style={{ display: "flex", height: "100%" }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader
          prefix={<i className="fa fa-bars fa-large"></i>}
        ></CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink
              exact
              to="/"
              activeClassName="activeClicked"
              target="_blank"
            >
              <CDBSidebarMenuItem icon="columns">Reg.Form</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Admin</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/recyclebin" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">RecycleBin</CDBSidebarMenuItem>
            </NavLink>
            <NavLink activeClassName="activeClicked" onClick={handleChangeP}>
              <CDBSidebarMenuItem icon="exclamation-circle">
                Change Password
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        {/* <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 5px"
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter> */}
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
