import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/UpdateProblem.css";
const UpdateProblem = (props) => {
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
      <div className="upForm-container">
        <h2>Update Problem</h2>
        <form onSubmit={handleSubmit}>
          <div className="upForm-group">
            <label className="upForm-label" htmlFor="title">
              Title:
            </label>
            <input
              className="upForm-input"
              type="text"
              name="title"
              value={title}
              placeholder="Enter Update Title"
              onChange={handleOnChange}
            />
          </div>
          <div className="upForm-group">
            <label className="upForm-label" htmlFor="statement">
              Statement:
            </label>
            <textarea
              className="upForm-input"
              name="statement"
              value={statement}
              placeholder="Enter update statement"
              onChange={handleOnChange}
            />
          </div>
          <div className="upForm-group">
            <label className="upForm-label" htmlFor="difficulty">
              Difficulty:
            </label>
            <select
              className="upForm-select"
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
          <div className="upForm-group">
            <label className="upForm-label" htmlFor="statement">
              Input Constraints:
            </label>
            <textarea
              className="upForm-input"
              name="inputConstraints"
              value={inputConstraints}
              placeholder="Enter update Input Constraints"
              onChange={handleOnChange}
            />
          </div>
          <div className="upForm-group">
            <label className="upForm-label" htmlFor="sampleInput">
              Sample Input:
            </label>
            <textarea
              className="upForm-input"
              name="sampleInput"
              value={sampleInput}
              placeholder="Enter update Sample Input"
              onChange={handleOnChange}
            />
          </div>
          <div className="upForm-group">
            <label className="upForm-label" htmlFor="outputConstraints">
              Output Constraints:
            </label>
            <textarea
              className="upForm-input"
              name="outputConstraints"
              value={outputConstraints}
              placeholder="Enter update Output Constraints"
              onChange={handleOnChange}
            />
          </div>
          <div className="upForm-group">
            <label className="upForm-label" htmlFor="sampleOutput">
              Sample Output:
            </label>
            <textarea
              className="upForm-input"
              name="sampleOutput"
              value={sampleOutput}
              placeholder="Enter update Sample Output"
              onChange={handleOnChange}
            />
          </div>
          <div className="upForm-group">
            <label className="upForm-label" htmlFor="testcasesInput">
              Testcases Input:
            </label>
            <textarea
              className="upForm-input"
              name="testcasesInput"
              value={testcasesInput}
              placeholder="Enter uodate Testcase Input"
              onChange={handleOnChange}
            />
          </div>
          <div className="upForm-group">
            <label className="upForm-label" htmlFor="testcasesOutput">
              Testcases Output:
            </label>
            <textarea
              className="upForm-input"
              name="testcasesOutput"
              value={testcasesOutput}
              placeholder="Enter Testcases Output"
              onChange={handleOnChange}
            />
          </div>
          <button className="upSubmit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProblem;
