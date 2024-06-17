import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
const DeleteProblem = (props) => {
  const { _id, title, difficulty } = props.obj;
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const deleteProblem = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/`,
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
            `${import.meta.env.VITE_BACKEND_URL}/problems/${_id}`
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
  let badgeColor;
  switch (difficulty) {
    case "easy":
      badgeColor = "success";
      break;
    case "medium":
      badgeColor = "warning";
      break;
    case "hard":
      badgeColor = "danger";
      break;
    default:
      badgeColor = "secondary";
  }
  return (
    <>
      <li className="list-group-item d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">{title}</h5>

        <div>
          <div className={`badge bg-${badgeColor} text-white me-2`} style={{ minWidth: '4em' }}>
            {difficulty}
          </div>
          <Link className="btn btn-info btn-sm me-2" to={`/problem/${_id}`}>
            View
          </Link>
          <Link className="btn btn-warning btn-sm me-2" to={`/updateProblem/${_id}`}>
            Update
          </Link>
          <button className="btn btn-danger btn-sm" onClick={deleteProblem}>
            Delete
          </button>
        </div>
        {errors && <div className="text-danger">{errors}</div>}
      </li>
    </>
  );
};

export default DeleteProblem;
