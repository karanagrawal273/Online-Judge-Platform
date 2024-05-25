import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
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
          navigate("/login");
        } else setName(response.data.user);
      } catch (error) {
        console.log(error.response.data.message);

        navigate("/login");
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
      <h1>Welcome to Online Judge</h1>
      <h2>Hello {name}</h2>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Home;
