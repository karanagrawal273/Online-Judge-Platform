import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import "bootstrap/dist/css/bootstrap.css";
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
      <Navbar />
      <div className="container-fluid ">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-8 col-lg-6 col-xl-4">
            <div className="card shadow-lg rounded-3 border-primary">
              <div className="card-body p-4 p-md-5">
                <h2 className="display-6 text-center mb-4">Add Problem</h2>
                <form onSubmit={handleSubmit}>
                  <div class="mb-3">
                    <label for="title" class="form-label">
                      Title:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="title"
                      value={title}
                      placeholder="Enter Title"
                      onChange={handleOnChange}
                    />
                    {errors.title && (
                      <div className="invalid-feedback d-block">
                        {errors.title}
                      </div>
                    )}
                  </div>
                  <div class="mb-3">
                    <label for="statement" class="form-label">
                      Statement:
                    </label>
                    <textarea
                      class="form-control"
                      rows="3"
                      name="statement"
                      value={statement}
                      placeholder="Enter statement"
                      onChange={handleOnChange}
                    ></textarea>
                    {errors.statement && (
                      <div className="invalid-feedback d-block">
                        {errors.statement}
                      </div>
                    )}
                  </div>
                  <div class="mb-3">
                    <label for="difficulty" class="form-label">
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
                      <div className="invalid-feedback d-block">
                        {errors.difficulty}
                      </div>
                    )}
                  </div>
                  <div class="mb-3">
                    <label for="inputConstraints" class="form-label">
                      Input Constraints:
                    </label>
                    <textarea
                      class="form-control"
                      rows="3"
                      name="inputConstraints"
                      value={inputConstraints}
                      placeholder="Enter Input Constraints"
                      onChange={handleOnChange}
                    ></textarea>
                    {errors.inputConstraints && (
                      <div className="invalid-feedback d-block">
                        {errors.inputConstraints}
                      </div>
                    )}
                  </div>
                  <div class="mb-3">
                    <label for="sampleInput" class="form-label">
                      Sample Input:
                    </label>
                    <textarea
                      class="form-control"
                      rows="3"
                      name="sampleInput"
                      value={sampleInput}
                      placeholder="Enter Sample Input"
                      onChange={handleOnChange}
                    ></textarea>
                    {errors.sampleInput && (
                      <div className="invalid-feedback d-block">
                        {errors.sampleInput}
                      </div>
                    )}
                  </div>
                  <div class="mb-3">
                    <label for="outputConstraints" class="form-label">
                      Output Constraints:
                    </label>
                    <textarea
                      class="form-control"
                      rows="3"
                      name="outputConstraints"
                      value={outputConstraints}
                      placeholder="Enter Output Constraints"
                      onChange={handleOnChange}
                    ></textarea>
                    {errors.outputConstraints && (
                      <div className="invalid-feedback d-block">
                        {errors.outputConstraints}
                      </div>
                    )}
                  </div>
                  <div class="mb-3">
                    <label for="sampleOutput" class="form-label">
                      Sample Output:
                    </label>
                    <textarea
                      class="form-control"
                      rows="3"
                      name="sampleOutput"
                      value={sampleOutput}
                      placeholder="Enter Sample Output"
                      onChange={handleOnChange}
                    ></textarea>
                    {errors.sampleOutput && (
                      <div className="invalid-feedback d-block">
                        {errors.sampleOutput}
                      </div>
                    )}
                  </div>
                  <div class="mb-3">
                    <label for="testcasesInput" class="form-label">
                      Testcases Input:
                    </label>
                    <textarea
                      class="form-control"
                      rows="3"
                      name="testcasesInput"
                      value={testcasesInput}
                      placeholder="Enter Testcases Input"
                      onChange={handleOnChange}
                    ></textarea>
                    {errors.testcasesInput && (
                      <div className="invalid-feedback d-block">
                        {errors.testcasesInput}
                      </div>
                    )}
                  </div>
                  <div class="mb-3">
                    <label for="testcasesOutput" class="form-label">
                      Testcases Output:
                    </label>
                    <textarea
                      class="form-control"
                      rows="3"
                      name="testcasesOutput"
                      value={testcasesOutput}
                      placeholder="Enter Testcases Output"
                      onChange={handleOnChange}
                    ></textarea>
                    {errors.testcasesOutput && (
                      <div className="invalid-feedback d-block">
                        {errors.testcasesOutput}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                  >
                    Submit
                  </button>
                  {submitError && (
                    <div className="text-danger mt-3 text-center">
                      {submitError}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProblem;
