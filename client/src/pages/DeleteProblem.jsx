import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/DeleteProblem.css";
const DeleteProblem = (props) => {
  const { _id, title, difficulty } = props.obj;
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const deleteProblem = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/",
        {},
        { withCredentials: true }
      );
      // console.log(response);
      if (!response.data.success) {
        console.log("Admin token not found Please login first");
        navigate("/adminlogin");
      } else {
        try {
          const response = await axios.delete(
            `http://localhost:5000/problems/${_id}`
          );
          window.location.reload();
        } catch (error) {
          setErrors(error.response.data.message);
        }
      }
    } catch (error) {
      navigate("/adminlogin");
    }
  };
  return (
    <>
      <li className="delProblem-item">
        <div className="delTitle">{title}</div>
        <div className="delDifficulty">{difficulty}</div>
        <div className="delLinks">
          <Link className="delLink" to={`/problem/${_id}`}>
            View
          </Link>
          <Link className="delLink" to={`/updateProblem/${_id}`}>
            Update
          </Link>
        </div>
        <button className="delDelete-button" onClick={deleteProblem}>
          Delete
        </button>
      </li>
      {errors && <span className="delError-message">{errors}</span>}
    </>
  );
};

export default DeleteProblem;
