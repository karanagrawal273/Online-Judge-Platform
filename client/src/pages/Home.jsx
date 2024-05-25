import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
// import { Cookies } from "react-cookie";
import axios from "axios";
const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [name, setName] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      console.log(cookies.token);
      const response = await axios.post(
        "http://localhost:5000",
        {},
        { withCredentials: true }
      );
      if (!response.data.token) {
        console.log('token not found');
        navigate("/login");
      }
      const { status, user} = response.data;
      // console.log(response);
      setName(user);
      if (!status) {
        removeCookie("token");
        navigate("/login");
      }
    };
    verifyCookie();
  },[]);
  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
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
