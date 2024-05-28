import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../css/Problem.css";
const Problem = (props) => {
  const [problem, setProblem] = useState({});
  const id = useParams().id;
  //   console.log(id);
  const handle = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/problems/${id}`);
      setProblem(response.data.problem);
      //   console.log(response);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  handle();

  //   console.log(problem);
  return (
    <>
      <div className="problem">
        <div className="problem-title">Problem</div>
        <div>
          <div className="problem-detail">{problem.title}</div>
          <div className="problem-detail">{problem.statement}</div>
          <div className="problem-detail">Difficulty: {problem.difficulty}</div>
        </div>
      </div>
    </>
  );
};

export default Problem;
