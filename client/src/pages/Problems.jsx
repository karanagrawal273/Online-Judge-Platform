import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Problem from "./Problem";
import DeleteProblem from "./DeleteProblem";
import "../css/Problems.css";
const Problems = () => {
  const [problem, setProblem] = useState([]);
  const handle = async () => {
    try {
      const response = await axios.get("http://localhost:5000/problems");
      const prob = response.data.allProblems;
      setProblem(prob);
      
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  handle();
  const problemList = () => {
    return problem.map((res, i) => {
      return <DeleteProblem obj={res} key={i} />;
    });
  };
  return (
    <>
      <div className="problems-section">
        <div className="section-title">Problems</div>
        <div className="add-link">
          <Link to={"/addProblem"}>Add Problems</Link>
        </div>
        <ul className="problem-list">{problemList()}</ul>
      </div>
    </>
  );
};

export default Problems;
