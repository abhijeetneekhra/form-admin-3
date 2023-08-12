import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./RegForm.css";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    course: "",
    gender: "",
    phone: "+91 ",
    currentAddress: "",
    email: "",
  });

  let token = localStorage.getItem("token");
  const headers = { Authorization: "Bearer " + token };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/api/v1/user/get-user/${id}`, {
        headers,
      });
      if (data?.success) {
        console.log("data: " + data.users[0].firstname);
        const student = data.users[0];
        setInputs({
          firstname: student.firstname,
          middlename: student.middlename,
          lastname: student.lastname,
          course: student.course,
          gender: student.gender,
          phone: student.phone,
          currentAddress: student.currentAddress,
          email: student.email,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    console.log("passed id: " + id);
    fetchUser();
  }, []);

  //handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/v1/user/updateUser",
        {
          id: id,
          course: inputs.course,
          gender: inputs.gender,
          currentAddress: inputs.currentAddress,
        },
        { headers }
      );
      if (data.success) {
        toast.success("Student record updated successfully!");
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "lightblue" }}>
        <form onSubmit={handleSubmit} className="mx-5 alignment">
          <h3 className="marg">Student Registration Edit Form</h3>
          <hr
            style={{
              background: "white",
              color: "white",
              borderColor: "white",
              height: "2px",
              opacity: 1.0,
            }}
          />
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label required">
              First Name:
            </label>
            <input
              value={inputs.firstname}
              onChange={handleChange}
              name="firstname"
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
              maxlength="30"
              pattern="[A-Za-z]{3,30}"
              disabled
            />
            <div id="emailHelp" class="form-text"></div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Middle Name:
            </label>
            <input
              value={inputs.middlename}
              onChange={handleChange}
              name="middlename"
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              maxlength="30"
              pattern="[A-Za-z]{3,30}"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Last Name:
            </label>
            <input
              value={inputs.lastname}
              onChange={handleChange}
              name="lastname"
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
              maxlength="30"
              pattern="[A-Za-z]{3,30}"
              disabled
            />
            <div id="emailHelp" class="form-text"></div>
          </div>
          <label for="exampleInputGender" class="form-label required">
            Course:
          </label>
          <div>
            <select name="course" value={inputs.course} onChange={handleChange}>
              <option value="Course">Course</option>
              <option value="B.SC">B.Sc</option>
              <option value="BBA">BBA</option>
              <option value="B.E">B.E</option>
            </select>
          </div>
          <br />
          <label for="exampleInputGender" class="form-label required">
            Gender:
          </label>
          <div onChange={handleChange}>
            <input
              type="radio"
              value="Male"
              name="gender"
              checked={inputs.gender === "Male"}
            />
            Male
            <input
              type="radio"
              value="Female"
              name="gender"
              checked={inputs.gender === "Female"}
            />
            Female
            <input
              type="radio"
              value="Other"
              name="gender"
              checked={inputs.gender === "Other"}
            />
            Other
          </div>
          <br />
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label required">
              Phone:
            </label>
            <input
              value={inputs.phone}
              onChange={handleChange}
              name="phone"
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
              maxlength="14"
              disabled
            />
            <div id="emailHelp" class="form-text"></div>
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label required">
              Current Address:
            </label>
            <textarea
              value={inputs.currentAddress}
              onChange={handleChange}
              name="currentAddress"
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              required
              maxlength="200"
            ></textarea>
            <div id="emailHelp" class="form-text"></div>
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label required">
              email
            </label>
            <input
              value={inputs.email}
              onChange={handleChange}
              name="email"
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
              maxlength="30"
              disabled
            />
            <div id="emailHelp" class="form-text"></div>
          </div>
          <div class="d-grid gap-2">
            <button class="btn btn-success" type="submit">
              Update Record
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditForm;
