import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import "bootstrap/dist/css/bootstrap.css";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}`,
          {},
          { withCredentials: true }
        );
        // console.log(response);
        if (response.data.success) {
          navigate("/");
        }
      } catch (error) {
        console.log(error.response.data.message);
        navigate("/login");
      }
    };
    verifyCookie();
  }, []);
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
          `${import.meta.env.VITE_BACKEND_URL}/login`,
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
      <Navbar />
      <div className="container-fluid ">
        <div
          className="row justify-content-center align-items-center"
          style={{ marginTop: "100px" }}
        >
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg rounded-3 border-primary">
              <div className="card-body p-4 p-md-5">
                <h2 className="display-5 text-center mb-4">Login Account</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={email}
                      placeholder="Enter your Email"
                      onChange={handleOnChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      name="password"
                      value={password}
                      placeholder="Enter your password"
                      onChange={handleOnChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Submit
                  </button>
                </form>
                <div className="mt-3 text-center">
                  <p className="mb-0">Don't have an Account? </p>
                  <Link to={"/signup"}>Sign Up</Link>
                </div>
                {submitError && (
                  <div className="text-danger mt-3 text-center">
                    {submitError}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
