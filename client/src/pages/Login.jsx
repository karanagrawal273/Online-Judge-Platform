import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        ...inputValue,
        },
        { withCredentials: true }
      );
      const {success,message}=response.data;
      if (success) {
        setInputValue({
          email: "",
          password: "",
        });
        navigate("/");
        // console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your Email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Don't have an Account <Link to={"/signup"}>SignUp</Link>
        </span>
      </form>
    </>
  );
};

export default Login;
