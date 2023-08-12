import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import Calendar2 from "./Calendar2";
import { CSVLink } from "react-csv";
import "react-datepicker/dist/react-datepicker.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Sidebar3 from "./Sidebar3";
//import { alert } from "react-bootstrap-confirmation";

export const Admin = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [fstudents, setFstudents] = useState([]);

  // const [startDate, setStartDate] = useState(new Date());
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(new Date());

  let token = localStorage.getItem("token");
  const headers = { Authorization: "Bearer " + token };

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/all-users", { headers });
      if (data?.success) {
        // data.users.map(
        //   (item, index) =>
        //     (item.firstname =
        //       item.firstname + " " + item.middlename + " " + item.lastname)
        // );
        var studentList = data.users;
        //studentList.sort((a, b) => (a.firstname.localCompare(b.firstname));

        for (var i = 0; i < studentList.length; i++) {
          studentList[i].firstname =
            studentList[i].firstname +
            " " +
            studentList[i].middlename +
            " " +
            studentList[i].lastname;
          var now = new Date(studentList[i].createdAt);
          studentList[i].createdAt = now.toLocaleDateString();
          studentList[i].createdTime = now.toLocaleTimeString();

          var now2 = new Date(studentList[i].updatedAt);
          studentList[i].updatedAt =
            now2.toLocaleDateString() + " " + now2.toLocaleTimeString();
          // console.log(
          //   studentList[i].createdAt + " " + studentList[i].createdTime
          // );
        }

        setStudents(studentList);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);

        //console.log("startDate: " + startDate);
        //console.log("endDate: " + endDate);

        let filtered = studentList.filter((student) => {
          let studentDate = new Date(student["createdAt"]).setHours(0, 0, 0, 0);
          return studentDate >= startDate && studentDate <= endDate;
        });

        filtered.sort(function (a, b) {
          return a.firstname > b.firstname
            ? 1
            : b.firstname > a.firstname
            ? -1
            : 0;
        });

        for (i = 0; i < filtered.length; i++) {
          filtered[i]["Sno"] = i + 1;
        }
        setFstudents(filtered);

        //setFstudents(data.users);
        // filterStudents();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  const filterStudents = () => {
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    // console.log("startDate: " + startDate);
    // console.log("endDate: " + endDate);

    var filtered = students.filter((student) => {
      let studentDate = new Date(student["createdAt"]).setHours(0, 0, 0, 0);
      return studentDate >= startDate && studentDate <= endDate;
    });

    filtered.sort(function (a, b) {
      return a.firstname > b.firstname ? 1 : b.firstname > a.firstname ? -1 : 0;
    });

    for (var i = 0; i < filtered.length; i++) {
      filtered[i]["Sno"] = i + 1;
      //console.log(filtered[i]["Sno"]);
    }
    setFstudents(filtered);
  };

  const handleDelete = async (id, name) => {
    try {
      if (window.confirm("Do you really want to delete this student record?")) {
        const { data } = await axios.delete(`/api/v1/user/delete-user/${id}`, {
          headers,
        });
        if (data?.success) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id, name) => {
    try {
      if (window.confirm("Do you really want to edit this student record?")) {
        window.open("/editform/" + id, "_blank");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMore = async (id, currentAddress, cellContent) => {
    window.alert(cellContent);
  };

  const columns = [
    {
      dataField: "Sno",
      text: "S.No",
    },
    {
      dataField: "createdAt",
      text: "Reg. Date",
    },
    {
      dataField: "firstname",
      text: "Name",
      sort: true,
      sortCaret: (order, column) => {
        if (!order) return <span> 🔽</span>;
        else if (order === "asc") return <span> 🔽</span>;
        else if (order === "desc") return <span> 🔼</span>;
        return null;
      },
    },
    {
      dataField: "course",
      text: "Course",
    },
    {
      dataField: "gender",
      text: "Gender",
    },
    {
      dataField: "phone",
      text: "Phone",
    },
    {
      dataField: "currentAddress",
      text: "Current Address",
      formatter: (cellContent, row) => {
        var content = cellContent;
        if (content.length > 30) {
          content = content.substring(0, 30) + "...";
          return (
            <div>
              <span>{content}</span>
              <div class="text-left">
                <button
                  className="btn btn-link"
                  onClick={() =>
                    handleMore(row._id, row.currentAddress, cellContent)
                  }
                >
                  Show More
                </button>
              </div>
            </div>
          );
        }
        return content;
      },
      // onmouseover:
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "createdTime",
      text: "Reg. Time",
    },
    {
      dataField: "updatedAt",
      text: "Updated At",
    },
    {
      dataField: "remove",
      text: "Delete",
      formatter: (cellContent, row) => {
        return (
          <button
            className="btn btn-danger btn-xs"
            onClick={() => handleDelete(row._id, row.firstname)}
          >
            Delete
          </button>
        );
      },
    },
    {
      dataField: "edit",
      text: "Edit",
      formatter: (cellContent, row) => {
        return (
          <button
            className="btn btn-danger btn-xs"
            onClick={() => handleEdit(row._id, row.firstname)}
          >
            Edit
          </button>
        );
      },
    },
  ];

  const rowStyle2 = (row, rowIndex) => {
    const style = { backgroundColor: "#c8e6c9" };
    // get yesterday's date
    var d = new Date();
    var updatedAt = new Date(row.updatedAt);
    d.setDate(d.getDate() - 1);

    updatedAt.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);

    console.log("updatedAt " + updatedAt + " d " + d);
    if (updatedAt >= d) {
      style.backgroundColor = "#c8e6c9";
      style.color = "white";
      style.fontWeight = "bold";
      console.log("background-style: #c8e6c9 ");
    } else {
      style.backgroundColor = "#00BFFF";
      console.log("background-style: #00BFFF");
    }

    // if (rowIndex > 2) {
    //   style.fontWeight = "bold";
    //   style.color = "white";
    // }

    return style;
  };

  return (
    <div className="d-flex">
      <div>
        <Sidebar3 />
      </div>
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <Navbar logout={logout} />
        <div style={{ height: "100%" }}>
          <div
            style={{
              padding: "20px 5%",
              width: "100%",
              height: "90%",
              overflowY: "scroll",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, minmax(200px, 1200px))",
              }}
            >
              <div className="mt-3">
                <h4 className="font-weight-bold mb-3">
                  Student Registration - Admin Portal
                </h4>
                <div className="flexbox-container">
                  <div className="flexbox-container">
                    <label htmlFor="" style={{ paddingRight: "7px" }}>
                      From
                    </label>
                    <Calendar2
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        console.log("start date: " + date);
                      }}
                    />
                  </div>
                  <div className="flexbox-container">
                    <label htmlFor="" style={{ paddingRight: "7px" }}>
                      To
                    </label>
                    <Calendar2
                      selected={endDate}
                      onChange={(date) => {
                        setEndDate(date);
                        console.log("end date: " + date);
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={filterStudents}
                    style={{ margin: "11px" }}
                  >
                    Filter Records
                  </button>
                  <CSVLink
                    type="button"
                    class="btn btn-primary btn-sm"
                    data={fstudents}
                    filename={"student-registrations.csv"}
                    style={{ margin: "11px" }}
                  >
                    &nbsp;&nbsp;Download CSV Report
                  </CSVLink>
                  <CSVLink
                    type="button"
                    class="btn btn-success btn-sm"
                    data={students}
                    filename={"student-registrations.csv"}
                    style={{ margin: "11px" }}
                  >
                    &nbsp;&nbsp;Download all CSV Report
                  </CSVLink>
                </div>
                <div>Total records = {fstudents.length}</div>
                <BootstrapTable
                  bootstrap4
                  keyField="_id"
                  data={fstudents}
                  columns={columns}
                  hover
                  condensed
                  striped
                  pagination={paginationFactory()}
                  rowStyle={rowStyle2}
                ></BootstrapTable>
              </div>
            </div>
            <footer className="mx-auto my-3 text-center">
              <h5>&copy; This site is developed by Abhijeet Neekhra.</h5>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
