import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../css/AddProblem.css";
const AddProblem = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/admin/`,
          {},
          { withCredentials: true }
        );
        if (!response.data.success) {
          console.log("admin token not found Please login first");
          navigate("/adminlogin");
        }
      } catch (error) {
        console.log(error.response.data.message);
        navigate("/adminlogin");
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
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const validateAddProblem = (data) => {
    const errors = {};
    if (!data.title.trim()) {
      errors.title = "Title is required";
    }
    if (!data.statement.trim()) {
      errors.statement = "Statement is required";
    }
    if (!data.difficulty.trim()) {
      errors.difficulty = "Difficulty is required";
    }
    if (!data.inputConstraints.trim()) {
      errors.inputConstraints = "Input Constraints is required";
    }
    if (!data.sampleInput.trim()) {
      errors.sampleInput = "Sample Input is required";
    }
    if (!data.outputConstraints.trim()) {
      errors.outputConstraints = "Output Constraints is required";
    }
    if (!data.sampleOutput.trim()) {
      errors.sampleOutput = "Sample Output is required";
    }
    if (!data.testcasesInput.trim()) {
      errors.testcasesInput = "Input Testcases is required";
    }
    if (!data.testcasesOutput.trim()) {
      errors.testcasesOutput = "Output Testcases is required";
    }
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateAddProblem(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/problems/`,
          {
            ...values,
          },
          { withCredentials: true }
        );
        console.log("Problem Successfully Added");
        navigate("/problems");
      } catch (error) {
        setValues({
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
        setSubmitError(error.response.data.message);
      }
    } else {
      setValues({
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
      setSubmitError("Adding problem is failed. Try Again");
    }
  };
  return (
    <>
    <div className="addNavbar">
      <Link to={'/'}>Home</Link>
    </div>
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
            {errors.title && (
              <span className="addError-message">{errors.title}</span>
            )}
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
            {errors.statement && (
              <span className="addError-message">{errors.statement}</span>
            )}
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
            {errors.difficulty && (
              <span className="addError-message">{errors.difficulty}</span>
            )}
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
            {errors.inputConstraints && (
              <span className="addError-message">
                {errors.inputConstraints}
              </span>
            )}
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
            {errors.sampleInput && (
              <span className="addError-message">{errors.sampleInput}</span>
            )}
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
            {errors.outputConstraints && (
              <span className="addError-message">
                {errors.outputConstraints}
              </span>
            )}
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
            {errors.sampleOutput && (
              <span className="addError-message">{errors.sampleOutput}</span>
            )}
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
            {errors.testcasesInput && (
              <span className="addError-message">{errors.testcasesInput}</span>
            )}
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
            {errors.testcasesOutput && (
              <span className="addError-message">{errors.testcasesOutput}</span>
            )}
          </div>
          <button className="addSubmit-button" type="submit">
            Submit
          </button>
          {submitError && (
            <span className="addError-message">{submitError}</span>
          )}
        </form>
      </div>
    </>
  );
};

export default AddProblem;
