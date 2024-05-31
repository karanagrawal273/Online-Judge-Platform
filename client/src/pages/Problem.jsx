import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/Problem.css";

const Problem = () => {
  const [problem, setProblem] = useState({});
  const [values, setValues] = useState({
    language: "",
    code: "",
  });
  const { language, code } = values;
  const id = useParams().id;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const [errors, setErrors] = useState({
    langErr: "",
    codeErr: "",
    subErr: "",
  });
  const validateProblem = (data) => {
    const errors = {};
    if (!data.language.trim()) {
      errors.langErr = "Please Select the Language";
    }
    if (!data.code.trim()) {
      errors.codeErr = "Please write your code";
    }
    return errors;
  };
  const handleRun = async (e) => {
    e.preventDefault();
    const newErrors = validateProblem(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          `http://localhost:5000/run`,
          {
            ...values,
          },
          {
            withCredentials: true,
          }
        );
        if (response.data.success) console.log(response.data.output);
        else {
          setErrors({
            ...errors,
            subErr: response.data.message,
          });
        }
      } catch (error) {
        setErrors({
          ...errors,
          subErr: error.response.data.message,
        });
      }
    }
    console.log("Run Clicked");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateProblem(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) console.log(code);
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
      <div className="probContainer">
        <div className="probProblem">
          <div className="probProblem-title">Problem</div>
          <div>
            <div className="probProblem-detail">{problem.title}</div>
            <div className="probProblem-detail">{problem.statement}</div>
            <div className="probProblem-detail">
              Difficulty: {problem.difficulty}
            </div>
            <div className="probProblem-detail">
              Input Constraints: {problem.input && problem.input.constraints}
            </div>
            <div className="probProblem-detail">
              Sample Input: {problem.input && problem.input.sample}
            </div>
            <div className="probProblem-detail">
              Output Constraints: {problem.output && problem.output.constraints}
            </div>
            <div className="probProblem-detail">
              Sample Output: {problem.output && problem.output.sample}
            </div>
          </div>
        </div>
        <div className="probCode-editor">
          <div className="probLanguageSelect">
            <label className="probForm-label" htmlFor="language">
              Language:
            </label>
            <select
              className="probLang-select"
              name="language"
              value={language}
              onChange={handleOnChange}
            >
              <option value="">Select Language</option>
              <option value="cpp">C++</option>
              {/* <option value="java">Java</option>
              <option value="py">Python</option> */}
            </select>
            {errors.langErr && (
              <span className="probError-message">{errors.langErr}</span>
            )}
          </div>
          <div className="probForm-group">
            <label className="probForm-label" htmlFor="codeEditor">
              Write Code here:
            </label>
            <textarea
              className="probForm-input"
              name="code"
              value={code}
              placeholder=""
              onChange={handleOnChange}
            />
            {errors.codeErr && (
              <span className="probError-message">{errors.codeErr}</span>
            )}
          </div>
          <button onClick={handleRun} className="probRun-button" type="submit">
            Run
          </button>
          {errors.subErr && (
            <span className="probError-message">{errors.subErr}</span>
          )}
          <button
            onClick={handleSubmit}
            className="probRun-button"
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
