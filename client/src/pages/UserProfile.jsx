import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../css/UserProfile.css';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000`,
          {},
          { withCredentials: true }
        );
        if (!response.data.success) {
          console.log("Token Not found");
          // navigate("/");
        } else {
          setUserDetails(response.data.user);
        }
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };
    fetchData();
  }, []);
  return (
    <>
    <div className="profNavbar">
      <Link to={'/'}>Home</Link>
      <Link to={'/problems'}>Problems</Link>
    </div>
      <div className="profUserDetails">
        <h2>First Name: {userDetails.firstname}</h2>
        <h2>Last Name: {userDetails.lastname}</h2>
        <h2>Phone:{userDetails.phone}</h2>
        <h2>Email: {userDetails.email}</h2>
      </div>
    </>
  );
};

export default UserProfile;
