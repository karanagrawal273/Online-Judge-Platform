import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteProblem from "./DeleteProblem";
import "../css/Problems.css";

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [difficulty, setDifficulty] = useState("");

  const handleOnChange = (e) => {
    setDifficulty(e.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (difficulty === "") {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/problems/`);
          const prob = response.data.allProblems;
          setProblems(prob);
        } catch (error) {
          console.log(error.response.data.message);
        }
      } else {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/problems/diff/${difficulty}`);
          const prob = response.data.allProblems;
          setProblems(prob);
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    };

    fetchData();
  }, [difficulty]);

  const problemList = () => {
    return problems.map((res, i) => {
      return <DeleteProblem obj={res} key={i} />;
    });
  };

  return (
    <>
    <div className="probsNavbar">
      <div>
        <Link to={'/'}>Home</Link>
      </div>
    </div>
      <div className="SearchFilter">
        <label className="probForm-label" htmlFor="difficulty">
          Filter by Difficulty:
        </label>
        <select
          className="probsSelectDifficulty"
          name="difficulty"
          onChange={handleOnChange}
        >
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="probsProblems-section">
        <div className="probsSection-title">Problems</div>
        <div className="probsAdd-link">
          <Link to={"/addProblem"}>Add Problems</Link>
        </div>
        <ul className="probsProblem-list">{problemList()}</ul>
      </div>
    </>
  );
};

export default Problems;
