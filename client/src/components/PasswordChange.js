import React, { useState } from "react";
import StrengthMeter from "./StrengthMeter";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import { Box, Typography, TextField, Button } from "@mui/material";
import "./RegForm.css";

const Form = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const [passMatch, setPassMatch] = React.useState(true);
  const [submitDisabled, setSubmitDisabled] = React.useState(true);

  const [inputs, setInputs] = useState({
    currentpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  const [isError, setError] = useState(null);

  //handle input change
  const onChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  React.useEffect(() => {
    validatePassword();
  }, [inputs.newpassword, inputs.confirmpassword]);

  React.useEffect(() => {
    validateNewPassword();
  }, [inputs.newpassword]);

  const validatePassword = () => {
    inputs.newpassword === inputs.confirmpassword
      ? setPassMatch(true)
      : setPassMatch(false);
  };

  React.useEffect(() => {
    validateFields();
  }, [inputs, passMatch]);

  const validateFields = () => {
    console.log("inside validatefields isStrong: " + isStrong);
    if (
      inputs.currentpassword.length > 0 &&
      inputs.newpassword.length > 0 &&
      passMatch === true &&
      isStrong === "Strong"
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  };

  const validateNewPassword = () => {
    let password = inputs.newpassword;
    setError(null);
    let caps, small, num, specialSymbol;
    if (password.length < 4) {
      setError(
        "Password must have min 4 characters, Uppercase, lowercase, number and special character"
      );
      return;
    } else {
      caps = (password.match(/[A-Z]/g) || []).length;
      small = (password.match(/[a-z]/g) || []).length;
      num = (password.match(/[0-9]/g) || []).length;
      specialSymbol = (password.match(/\W/g) || []).length;
      if (caps < 1) {
        setError("Must add one UPPERCASE letter");
        return;
      } else if (small < 1) {
        setError("Must add one lowercase letter");
        return;
      } else if (num < 1) {
        setError("Must add one number");
        return;
      } else if (specialSymbol < 1) {
        setError("Must add one special symbol: @$! % * ? &");
        return;
      }
    }
  };
  const [isStrong, initRobustPassword] = useState(null);
  const initPwdInput = async (childData) => {
    initRobustPassword(childData);
  };

  let token = localStorage.getItem("token");
  const headers = { Authorization: "Bearer " + token };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/v1/admin/changepassword",
        {
          email: email,
          currentpassword: inputs.currentpassword,
          newpassword: inputs.newpassword,
        },
        { headers }
      );
      if (data.success) {
        navigate("/hello2");
      }
    } catch (error) {
      toast.success("Error in password change");
      console.log(error);
    }
  };
  return (
    <div className="center">
      <form onSubmit={onSubmit}>
        <Box
          maxWidth={600}
          display="flex"
          flexDirection={"column"}
          alignItems="left"
          justifyContent={"left"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography variant="h5" padding={1} textAlign="center">
            Password Change
          </Typography>
          <Typography variant="h6" padding={1} textAlign="center">
            Hi {email}
          </Typography>
          <Typography>
            <strong>Current Password</strong>
          </Typography>
          <br />
          <TextField
            type="password"
            id="currentpassword"
            name="currentpassword"
            onChange={onChange}
            required
          />
          <br />
          <Typography>
            <strong>New Password</strong>
          </Typography>
          <br />
          {isError !== null && <p className="errors"> - {isError}</p>}
          <TextField
            type="password"
            id="newpassword"
            name="newpassword"
            onChange={onChange}
            inputProps={{
              maxLength: 16,
              minLength: 8,
            }}
            required
          />
          <StrengthMeter password={inputs.newpassword} actions={initPwdInput} />
          {/* {isStrong === "strong" && <button type="submit"> Register </button>} */}

          <label>
            <strong>Confirm Password</strong>
          </label>
          <br />
          <TextField
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            onChange={onChange}
            className={`form-control ${passMatch ? "" : "input-error-border"}`}
            inputProps={{
              maxLength: 16,
              minLength: 8,
            }}
            required
          />
          <div className="input-error">
            {passMatch ? "" : "Error: Passwords do not match"}
          </div>
          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
            disabled={submitDisabled}
          >
            Change Password
          </Button>
        </Box>
      </form>
    </div>
  );
};
export default Form;
