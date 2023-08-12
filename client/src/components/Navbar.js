import React from "react";
import { Header } from "./Navbar.style";
import { CDBNavbar, CDBInput } from "cdbreact";
import "./Admin.css";

const Navbar = (props) => {
  let userName = localStorage.getItem("userName");

  return (
    <Header style={{ background: "#333", color: "#fff" }}>
      <CDBNavbar dark expand="md" scrolling className="justify-content-end">
        {/* <CDBInput type="search" size="md" hint="Search" className="mb-n4 mt-n3 input-nav"/> */}
        <div className="ml-auto">
          {/* <i className="fas fa-bell"></i>
              <i className="fas fa-comment-alt mx-4"></i>
              <img alt="panelImage" src="img/pane/pane4.png" style={{width:"3rem",height:"3rem"}}/> */}
          <div>
            <div className="float-end">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={props.logout}
              >
                Logout
              </button>
            </div>
            <div className="float-end">
              <h3 className="distance">Welcome {userName}</h3>
            </div>
          </div>
        </div>
      </CDBNavbar>
    </Header>
  );
};

export default Navbar;
