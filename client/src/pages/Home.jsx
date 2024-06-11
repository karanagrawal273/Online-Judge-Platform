import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Home.css";
const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/`,
          {},
          { withCredentials: true }
        );
        // console.log(response);
        if (!response.data.success) {
          console.log("token not found");
          // navigate("/login");
        } else {
          setName(response.data.user.firstname);
        }
      } catch (error) {
        console.log(error.response.data.message);

        // navigate("/login");
      }
    };
    const verifyAdminCookie = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/admin/`,
          {},
          { withCredentials: true }
        );
        // console.log(response);
        if (!response.data.success) {
          console.log("Admin token not found");
          // navigate("/login");
        } else setAdmin(response.data.user);
      } catch (error) {
        console.log(error.response.data.message);

        // navigate("/login");
      }
    };

    verifyCookie();
    verifyAdminCookie();
  }, []);
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/logout`,
        {},
        { withCredentials: true }
      );
      if (!response.data.success) {
        console.log("Some Error Occurred");
      } else {
        // removeCookie('token');
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAdminLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/logout`,
        {},
        { withCredentials: true }
      );
      if (!response.data.success) {
        console.log("Some Error Occurred");
      } else {
        navigate("/adminlogin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="homeContainer">
        <div className="homeNavbar">
          <div className="leftLinks">
            <div className="homeNavbar-link">
              <Link to={"/problems"}>Problems</Link>
            </div>
          </div>
          <div className="rightLinks">
            {name !== "" ? (
              <div className="homeFlex">
                <Link to={`/userprofile/`}>
                  <h3 className="homeForm-title"> {name}</h3>{" "}
                </Link>
                <button className="homeSubmit-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="homeNavbar">
                <div className="homeNavbar-link">
                  <Link to={"/login"}>User Login</Link>
                </div>
                <div className="homeNavbar-link">
                  <Link to={"/signup"}>User SignUp</Link>
                </div>
              </div>
            )}
            {admin !== "" ? (
              <div className="homeFlex">
                <h2 className="homeForm-title">Admin </h2>{" "}
                <button
                  className="homeSubmit-button"
                  onClick={handleAdminLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="homeNavbar">
                <div className="homeNavbar-link">
                  <Link to={"/adminlogin"}>Admin Login</Link>
                </div>
                <div className="homeNavbar-link">
                  <Link to={"/adminsignup"}>Admin SignUp</Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <h1>Welcome to Online Judge</h1>
        <div className="homeOjPic">
          <p>
            An online judge is a platform or system that provides a programming
            environment to users for solving programming problems and
            challenges. It allows users to submit their code solutions, which
            are then compiled and executed against a set of test cases to
            evaluate correctness and efficiency.
          </p>
          <img src="../OnlineJudge.webp" alt="ImageNotFound"></img>
        </div>
      </div>
    </>
  );
};

export default Home;
