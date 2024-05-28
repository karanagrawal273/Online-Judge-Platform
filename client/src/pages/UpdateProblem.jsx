import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/UpdateProblem.css";
const UpdateProblem = (props) => {
  const id = useParams().id;
  // console.log(id);
  const [values, setValues] = useState({
    title: "",
    statement: "",
    difficulty: "",
  });
  const { title, statement, difficulty } = values;
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/problems/${id}`, {
        ...values,
      });
      console.log("problem Successfully Updated");
      navigate("/problems");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <>
      <div className="update-form-container">
        <h2>Update Problem</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              Title:
            </label>
            <input
              className="form-input"
              type="text"
              name="title"
              value={title}
              placeholder="Enter Update Title"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="statement">
              Statement:
            </label>
            <textarea
              className="form-input"
              name="statement"
              value={statement}
              placeholder="Enter update statement"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="difficulty">
              Difficulty:
            </label>
            <input
              className="form-input"
              type="text"
              name="difficulty"
              value={difficulty}
              placeholder="Enter update difficulty"
              onChange={handleOnChange}
            />
          </div>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProblem;
