import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/DeleteProblem.css";
const DeleteProblem = (props) => {
  const { _id, title, statement, difficulty } = props.obj;
  const navigate = useNavigate();
  const deleteProblem = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000",
        {},
        { withCredentials: true }
      );
      // console.log(response);
      if (!response.data.success) {
        console.log("token not found Please login first");
        navigate("/login");
      } else {
        try {
          const response = await axios.delete(
            `http://localhost:5000/problems/${_id}`
          );
          console.log("Problem gets deleted");
          window.location.reload();
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    } catch (error) {
      console.log("Some error occurred");
    }
  };
  return (
    <>
      <li className="problem-item">
        <div className="title">{title}</div>
        <div className="difficulty">{difficulty}</div>
        <div className="links">
          <Link className="link" to={`/problem/${_id}`}>
            View
          </Link>
          <Link className="link" to={`/updateProblem/${_id}`}>
            Update
          </Link>
        </div>
        <button className="delete-button" onClick={deleteProblem}>
          Delete
        </button>
      </li>
    </>
  );
};

export default DeleteProblem;
