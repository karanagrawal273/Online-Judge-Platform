import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/Problem.css";

const Problem = (props) => {
  const [problem, setProblem] = useState({});
  const id = useParams().id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/problems/${id}`
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
