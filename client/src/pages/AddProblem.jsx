import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/AddProblem.css";
const AddProblem = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000",
          {},
          { withCredentials: true }
        );
        if (!response.data.success) {
          console.log("token not found Please login first");
          navigate("/login");
        }
      } catch (error) {
        console.log(error.response.data.message);
        navigate("/login");
      }
    };
    verifyCookie();
  }, []);
  const id = useParams().id;
  // console.log(id);
  const [values, setValues] = useState({
    title: "",
    statement: "",
    difficulty: "",
    inputConstraints: "",
    sampleInput: "",
    outputConstraints: "",
    sampleOutput: "",
    testcasesInput: "",
    testcasesOutput: "",
  });
  const {
    title,
    statement,
    difficulty,
    inputConstraints,
    sampleInput,
    outputConstraints,
    sampleOutput,
    testcasesInput,
    testcasesOutput,
  } = values;
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
      const response = await axios.post(`http://localhost:5000/problems/`, {
        ...values,
      });
      console.log("Problem Successfully Added");
      navigate("/problems");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <>
      <div className="addForm-container">
        <h2>Add Problem</h2>
        <form onSubmit={handleSubmit}>
          <div className="addForm-group">
            <label className="addForm-label" htmlFor="title">
              Title:
            </label>
            <input
              className="addForm-input"
              type="text"
              name="title"
              value={title}
              placeholder="Enter Title"
              onChange={handleOnChange}
            />
          </div>
          <div className="addForm-group">
            <label className="addForm-label" htmlFor="statement">
              Statement:
            </label>
            <textarea
              className="addForm-input"
              name="statement"
              value={statement}
              placeholder="Enter statement"
              onChange={handleOnChange}
            />
          </div>
          <div className="addForm-group">
            <label className="addForm-label" htmlFor="difficulty">
              Difficulty:
            </label>
            <select
              className="addForm-select"
              name="difficulty"
              value={difficulty}
              onChange={handleOnChange}
            >
              <option value="">Select difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="addForm-group">
            <label className="addForm-label" htmlFor="inputConstraints">
              Input Constraints:
            </label>
            <textarea
              className="addForm-input"
              name="inputConstraints"
              value={inputConstraints}
              placeholder="Enter Input Constraints"
              onChange={handleOnChange}
            />
          </div>
          <div className="addForm-group">
            <label className="addForm-label" htmlFor="sampleInput">
              Sample Input:
            </label>
            <textarea
              className="addForm-input"
              name="sampleInput"
              value={sampleInput}
              placeholder="Enter Sample Input"
              onChange={handleOnChange}
            />
          </div>
          <div className="addForm-group">
            <label className="addForm-label" htmlFor="outputConstraints">
              Output Constraints:
            </label>
            <textarea
              className="addForm-input"
              name="outputConstraints"
              value={outputConstraints}
              placeholder="Enter Output Constraints"
              onChange={handleOnChange}
            />
          </div>
          <div className="addForm-group">
            <label className="addForm-label" htmlFor="sampleOutput">
              Sample Output:
            </label>
            <textarea
              className="addForm-input"
              name="sampleOutput"
              value={sampleOutput}
              placeholder="Enter Sample Output"
              onChange={handleOnChange}
            />
          </div>
          <div className="addForm-group">
            <label className="addForm-label" htmlFor="testcasesInput">
              Testcases Input:
            </label>
            <textarea
              className="addForm-input"
              name="testcasesInput"
              value={testcasesInput}
              placeholder="Enter Testcase Input"
              onChange={handleOnChange}
            />
          </div>
          <div className="addForm-group">
            <label className="addForm-label" htmlFor="testcasesOutput">
              Testcases Output:
            </label>
            <textarea
              className="addForm-input"
              name="testcasesOutput"
              value={testcasesOutput}
              placeholder="Enter Testcases Output"
              onChange={handleOnChange}
            />
          </div>
          <button className="addSubmit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProblem;
