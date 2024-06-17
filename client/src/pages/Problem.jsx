import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import "bootstrap/dist/css/bootstrap.css";

const Problem = () => {
  const navigate = useNavigate();
  const [problem, setProblem] = useState({});
  const [seconds, setSeconds] = useState(0);
  const [values, setValues] = useState({
    language: "",
    code: "",
    input: "",
    output: "",
    verdict: "",
  });
  const [submitValues, setSubmitValues] = useState({
    language: "",
    code: "",
    inputTestcases: " ",
    outputTestcases: "",
  });
  const { language, code, input, output, verdict } = values;
  // const { language, code, inputTestcases, outputTestcases } = submitValues;
  const id = useParams().id;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name == "language") {
      setValues({
        ...values,
        code: "",
        [name]: value,
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
    setSubmitValues({
      ...submitValues,
      inputTestcases: problem.testcases.input,
      outputTestcases: problem.testcases.output,
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

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/problems/${id}`,
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

    return () => clearInterval(interval);
  }, []);
  const handleRun = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/`,
        {},
        { withCredentials: true }
      );
      const newErrors = validateProblem(values);
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_COMPILER_URL}/run`,
            {
              ...values,
            },
            {
              withCredentials: true,
            }
          );
          if (response.data.success)
            setValues({
              ...values,
              output: response.data.output,
              verdict: "",
            });
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
    } catch (error) {
      navigate("/login");
    }
  };
  // const [userId, setUserId] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/`,
        {},
        { withCredentials: true }
      );
      const newErrors = validateProblem(values);
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        try {
          setSubmitValues({
            ...submitValues,
            inputTestcases: problem.testcases.input,
            outputTestcases: problem.testcases.output,
          });
          // console.log(values);
          // console.log(submitValues);
          const response = await axios.post(
            `${import.meta.env.VITE_COMPILER_URL}/submit`,
            { ...submitValues },
            { withCredentials: true }
          );
          if (response.data.success) {
            setValues({
              ...values,
              output: "",
              verdict: response.data.output,
            });
            try {
              const submissionResponse = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/problems/${problem._id}/${
                  userResponse.data.user._id
                }`,
                {
                  language: values.language,
                  solution: values.code,
                  verdict: response.data.output,
                  timeTaken: seconds,
                },
                { withCredentials: true }
              );
              console.log(submissionResponse.data.message);
            } catch (error) {
              console.log("some error occured", error);
            }
          } else {
            setErrors({
              ...errors,
              subErr: response.data.message,
            });
          }
        } catch (error) {
          console.log(error);
          setErrors({
            ...errors,
            subErr: error.response.data.message,
          });
        }
      }
    } catch (error) {
      navigate("/login");
    }
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const hour = Math.floor(time / 3600);
    const seconds = time % 60;
    return `${hour < 10 ? "0" : ""}${hour}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          {/* Problem Details Section */}
          <div className="col-lg-6 mb-4">
            <div className="card bg-primary bg-opacity-50 "style={{ color: "black" }}>
              <div className="card-body">
                <div className="mb-4">
                  <h3>{problem.title}</h3>
                  <p>{problem.statement}</p>
                </div>
                <div className="mb-3">
                  <h4>Difficulty:</h4> {problem.difficulty}
                </div>
                {problem.input && problem.input.constraints && (
                  <div className="mb-3">
                    <h4>Input Constraints:</h4> {problem.input.constraints}
                  </div>
                )}
                {problem.input && problem.input.sample && (
                  <div className="mb-3">
                    <h4>Sample Input:</h4> {problem.input.sample}
                  </div>
                )}
                {problem.output && problem.output.constraints && (
                  <div className="mb-3">
                    <h4>Output Constraints:</h4> {problem.output.constraints}
                  </div>
                )}
                {problem.output && problem.output.sample && (
                  <div className="mb-3">
                    <h4>Sample Output:</h4> {problem.output.sample}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Code Editor Section */}
          <div className="col-lg-6">
            <div
              className="card bg-primary bg-opacity-50 "
              style={{ color: "black" }}
            >
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Language:</label>
                  <select
                    className="form-select mb-2"
                    name="language"
                    value={language}
                    onChange={handleOnChange}
                  >
                    <option value="">Select Language</option>
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                    {/* <option value="py">Python</option> */}
                  </select>
                  {errors.langErr && (
                    <div className="text-danger">{errors.langErr}</div>
                  )}
                </div>
                <div className="mb-3" style={{ minHeight: "300px" }}>
                  {" "}
                  {/* Increased height */}
                  <label className="form-label">Write Code here:</label>
                  <textarea
                    className="form-control"
                    style={{ minHeight: "300px" }} // Ensures a minimum height
                    name="code"
                    value={code}
                    placeholder=""
                    onChange={handleOnChange}
                  />
                  {errors.codeErr && (
                    <div className="text-danger">{errors.codeErr}</div>
                  )}
                </div>
                <button
                  onClick={handleRun}
                  className="btn btn-light mb-2"
                  type="button"
                >
                  Run
                </button>
                <button
                  onClick={handleSubmit}
                  className="btn btn-light mb-2 ms-2"
                  type="button"
                >
                  Submit
                </button>
                {errors.subErr && (
                  <div className="text-danger">{errors.subErr}</div>
                )}
              </div>
            </div>

            {/* Solve Area Section */}
            <div className="card bg-primary bg-opacity-50 mt-4"style={{ color: "black" }}>
              <div className="card-body row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Input:</label>
                    <textarea
                      className="form-control"
                      style={{ minHeight: "100px" }}
                      name="input"
                      value={input}
                      placeholder="Enter your Input"
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                {values.output && (
                  <div className="col">
                    <div className="mb-3">Output: {values.output}</div>
                  </div>
                )}
                {values.verdict && (
                  <div className="col">
                    <div className="mb-3">Verdict: {values.verdict}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Time Elapsed Section */}
        <div className="fixed-bottom mb-4">
          <p className="text-primary">Time Elapsed: {formatTime(seconds)}</p>
        </div>
      </div>
    </>
  );
};

export default Problem;
