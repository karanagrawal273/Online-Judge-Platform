import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
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
        // console.log('here'+response);
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
      // console.log(response);
      if (!response.data.success) {
        console.log("Some Error Occurred");
      } else {
        // removeCookie('token');
        Cookies.remove('token');
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
      <nav className="navbar bg-primary navbar-expand-lg" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="/">
            Online Judge
          </a>
          <div className="navbar-nav me-auto ">
            <a className="nav-link text-white" href="/problems">
              Problems
            </a>
          </div>
          <div className="d-flex align-items-center">
            {name !== "" ? (
              <>
                <a className="nav-link me-3 text-white" href="/userprofile">
                  {name}
                </a>
                <a className="nav-link me-3 text-white" href="/leaderboard">
                  Leaderboard
                </a>
                <button
                  type="button"
                  className="nav-link me-3 btn btn-sm btn-outline-warning text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a className="nav-link me-3 text-white" href="/login">
                  UserLogin
                </a>
                <a className="nav-link me-3 text-white" href="/signup">
                  UserSignup
                </a>
              </>
            )}
            {admin !== "" ? (
              <>
                <a className="nav-link me-3 text-white" href="/admin">
                  Admin
                </a>
                <button
                  type="button"
                  className="nav-link btn btn-sm btn-outline-warning text-white"
                  onClick={handleAdminLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a className="nav-link text-white" href="/adminlogin">
                  AdminLogin
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
      <h1 className="display-1 text-center mt-5 mb-4">
        Welcome to <span className="text-primary fw-bold">Online Judge</span>
      </h1>

      <div className="container mt-5 ">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6 d-flex justify-content-center">
            <div
              className="card shadow rounded-3 "
              style={{ width: "500px", height: "400px" }}
            >
              <div className="card-body d-flex justify-content-center align-items-center bg-primary text-white p-3">
                <p
                  className="card-text text-center"
                  style={{ fontSize: "20px" }}
                >
                  An online judge is a platform or system that provides a
                  programming environment to users for solving programming
                  problems and challenges. It allows users to submit their code
                  solutions, which are then compiled and executed against a set
                  of test cases to evaluate correctness and efficiency.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <img
              src="./OnlineJudge.png"
              className="img-fluid rounded mx-auto d-block"
              alt="ImageNotFound"
            />
          </div>
        </div>
      </div>
      <br></br>
      <footer className="footer bg-primary text-light">
        <div className="container">
          <div className="row" style={{ paddingTop: "30px" }}>
            {/* Left column */}
            <div className="col-md-6">
              <h5>Online Judge</h5>
              <p className="text-white">
                A platform for coding challenges and submissions.
              </p>
            </div>

            {/* Middle column */}
            <div className="col-md-3">
              <h5>Connect</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Right column */}
            <div className="col-md-3">
              <p className="text-white text-right">
                &copy; {new Date().getFullYear()} Online Judge. All rights
                reserved.
              </p>
            </div>
          </div>
          <hr className="bg-light" />
        </div>
      </footer>
    </>
  );
};

export default Home;
