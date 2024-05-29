import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/Problem.css";

const Problem = () => {
  const [problem, setProblem] = useState({});
  const [code, setCode] = useState("");

  const id = useParams().id;
  const handleOnChange = (e) => {
    setCode(e.target.value);
  };
  const handleRun = async (e) => {
    e.preventDefault();
    if (code === "") {
      console.log("please write your code");
    } else console.log(code);
    console.log("Run Clicked");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code === "") {
      console.log("please write your code");
    } else console.log(code);
    console.log("Submit Clicked");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/problems/${id}`,
          {
            withCredentials: true,
          }
        );
        setProblem(response.data.problem);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="container">
        <div className="problem">
          <div className="problem-title">Problem</div>
          <div>
            <div className="problem-detail">{problem.title}</div>
            <div className="problem-detail">{problem.statement}</div>
            <div className="problem-detail">
              Difficulty: {problem.difficulty}
            </div>
            <div className="problem-detail">
              Input Constraints: {problem.input && problem.input.constraints}
            </div>
            <div className="problem-detail">
              Sample Input: {problem.input && problem.input.sample}
            </div>
            <div className="problem-detail">
              Output Constraints: {problem.output && problem.output.constraints}
            </div>
            <div className="problem-detail">
              Sample Output: {problem.output && problem.output.sample}
            </div>
          </div>
        </div>
        <div className="code-editor">
          <div className="form-group">
            <label className="form-label" htmlFor="codeEditor">
              Write Code here:
            </label>
            <textarea
              className="form-input"
              name="code"
              value={code}
              placeholder=""
              onChange={handleOnChange}
            />
          </div>
          <button onClick={handleRun} className="run-button" type="submit">
            Run
          </button>
          <button
            onClick={handleSubmit}
            className="submit-button"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Problem;
