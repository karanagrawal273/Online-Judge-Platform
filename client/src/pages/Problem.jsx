import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/Problem.css";

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
    setValues({
      ...values,
      [name]: value,
    });
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
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/problems/${id}`, {
          withCredentials: true,
        });
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
                `${import.meta.env.VITE_BACKEND_URL}/problems/${problem._id}/${userResponse.data.user._id}`,
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
      <div className="probNavbar">
        <div className="probHomeLink">
          <Link to={"/"}>Home</Link>
        </div>
        <div className="probProblemsLink">
          <Link to={"/problems"}>Problems</Link>
        </div>
      </div>
      <div className="probContainer">
        <div className="probProblem">
          <div className="probProblem-title">Problem</div>
          <div>
            <div className="probProblem-detail">
              <h3>{problem.title}</h3>
            </div>
            <div className="probProblem-detail">{problem.statement}</div>
            <div className="probProblem-detail">
              <h3>Difficulty:</h3> {problem.difficulty}
            </div>
            {problem.input && problem.input.constraints && (
              <div className="probProblem-detail">
                <h3>Input Constraints:</h3>{" "}
                {problem.input && problem.input.constraints}
              </div>
            )}
            {problem.input && problem.input.sample && (
              <div className="probProblem-detail">
                <h3>Sample Input:</h3> {problem.input && problem.input.sample}
              </div>
            )}
            {problem.output && problem.output.constraints && (
              <div className="probProblem-detail">
                <h3>Output Constraints:</h3>{" "}
                {problem.output && problem.output.constraints}
              </div>
            )}
            {problem.output && problem.output.sample && (
              <div className="probProblem-detail">
                <h3>Sample Output:</h3>{" "}
                {problem.output && problem.output.sample}
              </div>
            )}
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
              <option value="java">Java</option>
              {/* <option value="py">Python</option> */}
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
          <div className="probSolveArea">
            <div className="probInputArea">
              <label className="probInput" htmlFor="input">
                Input:
              </label>
              <textarea
                className="probInput-input"
                name="input"
                value={input}
                placeholder="Enter your Input"
                onChange={handleOnChange}
              />
            </div>
            <div className="probOutputArea">
              {values.output && (
                <div className="probOutput">Output: {values.output}</div>
              )}
            </div>
            <div className="probVerdictArea">
              {values.verdict && (
                <div className="probVerdict">Verdict: {values.verdict}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>Time Elapsed: {formatTime(seconds)}</p>
      </div>
    </>
  );
};

export default Problem;
