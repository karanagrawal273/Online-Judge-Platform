import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../css/UpdateProblem.css";
const UpdateProblem = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/admin/",
          {},
          { withCredentials: true }
        );
        if (!response.data.success) {
          console.log("Admin token not found Please login first");
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

  const validateUpdateProblem = (data) => {
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
    const newErrors = validateUpdateProblem(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.put(
          `http://localhost:5000/problems/${id}`,
          {
            ...values,
          },
          { withCredentials: true }
        );
        console.log("problem Successfully Updated");
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
      setSubmitError("Updating problem is failed. Try Again");
    }
  };
  return (
    <>
    <div className="upNavbar">
      <Link to={'/'}>Home</Link>
    </div>
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
            {errors.title && (
              <span className="upError-message">{errors.title}</span>
            )}
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
            {errors.statement && (
              <span className="upError-message">{errors.statement}</span>
            )}
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
            {errors.difficulty && (
              <span className="upError-message">{errors.difficulty}</span>
            )}
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
            {errors.inputConstraints && (
              <span className="upError-message">{errors.inputConstraints}</span>
            )}
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
            {errors.sampleInput && (
              <span className="upError-message">{errors.sampleInput}</span>
            )}
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
            {errors.outputConstraints && (
              <span className="upError-message">
                {errors.outputConstraints}
              </span>
            )}
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
            {errors.sampleOutput && (
              <span className="upError-message">{errors.sampleOutput}</span>
            )}
          </div>
          <div className="upForm-group">
            <label className="upForm-label" htmlFor="testcasesInput">
              Testcases Input:
            </label>
            <textarea
              className="upForm-input"
              name="testcasesInput"
              value={testcasesInput}
              placeholder="Enter update Testcase Input"
              onChange={handleOnChange}
            />
            {errors.testcasesInput && (
              <span className="upError-message">{errors.testcasesInput}</span>
            )}
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
            {errors.testcasesOutput && (
              <span className="upError-message">{errors.testcasesOutput}</span>
            )}
          </div>
          <button className="upSubmit-button" type="submit">
            Submit
          </button>
          {submitError && (
            <span className="upError-message">{submitError}</span>
          )}
        </form>
      </div>
    </>
  );
};

export default UpdateProblem;
