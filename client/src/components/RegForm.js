import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RegForm.css";
import validator from "validator";

const RegForm = () => {
  const CHARACTER_LIMIT = 200;
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("");

  const [inputs, setInputs] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    course: "",
    gender: "",
    phone: "+91 ",
    currentAddress: "",
    email: "",
    password: "",
    reTypePassword: "",
  });

  const [passMatch, setPassMatch] = React.useState(true);
  const [validEmail, setValidEmail] = React.useState(false);
  const [submitDisabled, setSubmitDisabled] = React.useState(true);

  const validateEmail = () => {
    var email = inputs.email;

    if (validator.isEmail(email)) {
      setEmailError("");
      setValidEmail(true);
    } else {
      setEmailError("Enter valid Email!");
      setValidEmail(false);
    }

    console.log("email: " + email + ", valid email: " + validEmail);
  };

  React.useEffect(() => {
    validateEmail();
  }, [inputs.email]);

  React.useEffect(() => {
    validatePassword();
  }, [inputs.password, inputs.reTypePassword]);

  React.useEffect(() => {
    validateFields();
  }, [inputs, passMatch, validEmail]);

  const validatePassword = () => {
    inputs.password === inputs.reTypePassword
      ? setPassMatch(true)
      : setPassMatch(false);
  };

  const validateFields = () => {
    if (
      inputs.firstname.length > 0 &&
      inputs.lastname.length > 0 &&
      inputs.course.length > 0 &&
      inputs.gender.length > 0 &&
      inputs.phone.length > 0 &&
      inputs.currentAddress.length > 0 &&
      inputs.email.length > 0 &&
      inputs.password.length > 0 &&
      passMatch === true &&
      validEmail === true
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  };
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
      const { data } = await axios.post("/api/v1/user/register", {
        firstname: inputs.firstname,
        middlename: inputs.middlename,
        lastname: inputs.lastname,
        course: inputs.course,
        gender: inputs.gender,
        phone: inputs.phone,
        currentAddress: inputs.currentAddress,
        email: inputs.email,
        password: inputs.password,
        reTypePassword: inputs.reTypePassword,
      });
      if (data.success) {
        toast.success("User Register Successfully");
        navigate("/hello");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "lightblue" }}>
        <form onSubmit={handleSubmit} className="mx-5 alignment">
          <h3 className="marg">Student Registration Form</h3>
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
            <input type="radio" value="Male" name="gender" /> Male
            <input type="radio" value="Female" name="gender" /> Female
            <input type="radio" value="Other" name="gender" /> Other
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
            <div>
              <span>{`${inputs.currentAddress.length}/${CHARACTER_LIMIT}`}</span>
            </div>
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
            />
            <span
              style={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              {emailError}
            </span>
            <div id="emailHelp" class="form-text"></div>
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label required">
              Password:
            </label>
            <input
              value={inputs.password}
              onChange={handleChange}
              name="password"
              type="password"
              class="form-control"
              id="password"
              aria-describedby="emailHelp"
              required
              maxlength="30"
            />
            <div id="emailHelp" class="form-text"></div>
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label required">
              Re-type Password
            </label>
            <input
              value={inputs.reTypePassword}
              onChange={handleChange}
              name="reTypePassword"
              type="password"
              className={`form-control ${
                passMatch ? "" : "input-error-border"
              }`}
              id="cnfrm-password"
              aria-describedby="emailHelp"
              required
              maxlength="30"
            />
            <div id="emailHelp" class="form-text"></div>
          </div>
          <div className="input-error">
            {passMatch ? "" : "Error: Passwords do not match"}
          </div>
          <div class="d-grid gap-2">
            <button
              class="btn btn-success"
              type="submit"
              disabled={submitDisabled}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegForm;
