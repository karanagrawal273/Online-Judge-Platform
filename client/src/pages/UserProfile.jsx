import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../css/UserProfile.css";

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [userSubmissions, setUserSubmissions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}`,
          {},
          { withCredentials: true }
        );
        if (!response.data.success) {
          console.log("Token Not found");
          navigate("/");
        } else {
          setUserDetails(response.data.user);
          setUserSubmissions(response.data.user.submissions);
          console.log(response.data.user);
          console.log(userSubmissions);
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
        <Link to={"/"}>Home</Link>
        <Link to={"/problems"}>Problems</Link>
      </div>
      <div className="profUserDetails">
        <h2>First Name: {userDetails.firstname}</h2>
        <h2>Last Name: {userDetails.lastname}</h2>
        <h2>Phone:{userDetails.phone}</h2>
        <h2>Email: {userDetails.email}</h2>
      </div>
      <div>
        <h2>Submissions:</h2>
        <table>
          <thead>
            <tr>
              <th>Problem</th>
              <th>Status</th>
              <th>Time Taken</th>
            </tr>
          </thead>
          <tbody>
          {userSubmissions.map((submission, index) => (
            <tr key={index}>
              <td>{submission.problemTitle}</td>
              <td>{submission.verdict}</td>
              <td>{submission.timeTaken}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </>
  );
};

export default UserProfile;
