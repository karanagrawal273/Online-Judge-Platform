import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "../css/Home.css";
const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000",
          {},
          { withCredentials: true }
        );
        // console.log(response);
        if (!response.data.success) {
          console.log("token not found");
          // navigate("/login");
        } else setName(response.data.user);
      } catch (error) {
        console.log(error.response.data.message);

        // navigate("/login");
      }
    };
    verifyCookie();
  });
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/logout",
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
  return (
    <>
      <div className="container">
        <h1>Welcome to Online Judge</h1>
        <div className="navbar">
          <div className="navbar-link">
            <Link to={"/problems"}>Problems</Link>
          </div>
          {name != "" && (
            <div>
              <h2 className="form-title">Hello {name}</h2>{" "}
              <button className="submit-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
          {name == "" && (
            <div className="navbar">
              <div className="navbar-link">
                <Link to={"/login"}>User Login</Link>
              </div>
              <div className="navbar-link">
                <Link to={"/signup"}>User SignUp</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
