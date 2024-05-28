import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/signup.css";
const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const { firstname, lastname, phone, email, password } = inputValue;
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const validateForm = (data, cnfpas) => {
    const errors = {};
    if (!data.firstname.trim()) {
      errors.firstname = "First Name is required";
    }
    if (!data.lastname.trim()) {
      errors.lastname = "Last Name is required";
    }
    if (!data.phone.trim()) {
      errors.phone = "Phone Number is required";
    } else if (data.phone.length != 10) {
      errors.phone = "Please enter the correct phone number";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }
    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (!cnfpas.trim()) {
      errors.confPass = "Cofirm Password is required";
    } else if (cnfpas !== data.password) {
      errors.confPass = "Passwords do not match";
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
  const handleOnChange1 = (e) => {
    const { name, value } = e.target;
    setConfirmPassword(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(inputValue, confirmPassword);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // console.log(inputValue);
      try {
        const response = await axios.post(
          "http://localhost:5000/register",
          {
            ...inputValue,
          },
          { withCredentials: true }
        );
        const { success, message } = response.data;

        if (success) {
          setInputValue({
            firstname: "",
            lastname: "",
            phone: "",
            email: "",
            password: "",
          });
          navigate("/");
        }
        // if (!response.ok) {
        //   const errorData = await response.json();
        //   throw new Error(errorData.message || "Something went wrong!");
        // }
        console.log(response);
      } catch (error) {
        setInputValue({
          firstname: "",
          lastname: "",
          phone: "",
          email: "",
          password: "",
        });
        setConfirmPassword("");
        setSubmitError(error.response.data.message);
        console.log(error.response.data.message);
      }
    } else {
      setInputValue({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        password: "",
      });
      setConfirmPassword("");
      setSubmitError("form submission failed");
      console.log("form submission failed");
    }
  };

  return (
    <>
      <div className="form-container">
        <h2 className="form-title">Signup Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="firstname">
              First Name:
            </label>
            <input
              className="form-input"
              type="text"
              name="firstname"
              value={firstname}
              placeholder="Enter your First Name"
              onChange={handleOnChange}
            />
            {errors.firstname && (
              <span className="error-message">{errors.firstname}</span>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="lastname">
              Last Name:
            </label>
            <input
              className="form-input"
              type="text"
              name="lastname"
              value={lastname}
              placeholder="Enter your Last Name"
              onChange={handleOnChange}
            />
            {errors.lastname && (
              <span className="error-message">{errors.lastname}</span>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              Phone:
            </label>
            <input
              className="form-input"
              type="number"
              name="phone"
              value={phone}
              placeholder="Enter your Phone Number"
              onChange={handleOnChange}
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>
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
          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              className="form-input"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Enter the same password"
              onChange={handleOnChange1}
            />
            {errors.confPass && (
              <span className="error-message">{errors.confPass}</span>
            )}
          </div>
          <button className="submit-button" type="submit">
            Submit
          </button>
          <span>
            &nbsp; Already have an account? <Link to={"/login"}>Login</Link>
          </span>
          {submitError && <span className="error-message">{submitError}</span>}
        </form>
      </div>
    </>
  );
};

export default Signup;
