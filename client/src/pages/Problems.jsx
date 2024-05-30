import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteProblem from "./DeleteProblem";
import "../css/Problems.css";

const Problems = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/problems");
        const prob = response.data.allProblems;
        setProblems(prob);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchData();
  }, []);

  const problemList = () => {
    return problems.map((res, i) => {
      return <DeleteProblem obj={res} key={i} />;
    });
  };

  return (
    <div className="probsProblems-section">
      <div className="probsSection-title">Problems</div>
      <div className="probsAdd-link">
        <Link to={"/addProblem"}>Add Problems</Link>
      </div>
      <ul className="probsProblem-list">{problemList()}</ul>
    </div>
  );
};

export default Problems;
