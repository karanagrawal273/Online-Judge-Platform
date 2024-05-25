import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  });
  const { firstname, lastname, phone, email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(inputValue);
    try {
      const response = await axios.post("http://localhost:5000/register", {
        ...inputValue,
        },
        {withCredentials: true}
      );
      const {success,message}=response.data;

      if (success) {
        setInputValue({
          firstname: "",
          lastname: "",
          phone: "",
          email: "",
          password: "",
        });
        navigate('/');
      }
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || "Something went wrong!");
      // }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">First Name:</label>
          <input
            type="text"
            name="firstname"
            value={firstname}
            placeholder="Enter your First Name"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="email">Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={lastname}
            placeholder="Enter your Last Name"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="email">Phone:</label>
          <input
            type="number"
            name="phone"
            value={phone}
            placeholder="Enter your Phone Number"
            onChange={handleOnChange}
          />
        </div>
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
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
    </>
  );
};

export default Signup;
