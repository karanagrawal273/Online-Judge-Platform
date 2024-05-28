import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const validateForm = (data) => {
    const errors = {};
    if (!data.email.trim()) {
      errors.email = "Email is required";
    }
    if (!data.password.trim()) {
      errors.password = "Password is required";
    }
    return errors;
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(inputValue);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/login",
          {
            ...inputValue,
          },
          { withCredentials: true }
        );
        const { success, message } = response.data;
        if (success) {
          setInputValue({
            email: "",
            password: "",
          });
          navigate("/");
          // console.log(response);
        } else {
          // console.log(success);
          setInputValue({
            email: "",
            password: "",
          });
          setSubmitError("login error");
          console.log("login error");
          // console.log(message);
        }
      } catch (error) {
        setInputValue({
          email: "",
          password: "",
        });
        setSubmitError(error.response.data.message);
        console.log(error.response.data.message);
      }
    } else {
      setInputValue({
        email: "",
        password: "",
      });
      setSubmitError("Login submission failed");
      console.log("Login submission failed");
    }
  };

  return (
    <>
      <div className="form-container">
        <h2 className="form-title">Login Account</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email:
            </label>
            <input
            className="form-input"
              type="email"
              name="email"
              value={email}
              placeholder="Enter your Email"
              onChange={handleOnChange}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password:
            </label>
            <input
            className="form-input"
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>
          <button className="submit-button" type="submit">
            Submit
          </button>
          <span>
            &nbsp; Don't have an Account <Link to={"/signup"}>SignUp</Link>
          </span>
          {submitError && <span className="error-message">{submitError}</span>}
        </form>
      </div>
    </>
  );
};

export default Login;
