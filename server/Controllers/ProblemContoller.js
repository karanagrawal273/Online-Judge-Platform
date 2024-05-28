const problems = require("../Model/Problems.js");
const { findById } = require("../Model/User.js");

module.exports.problems = async (req, res, next) => {
  try {
    const allProblems = await problems.find();
    if (allProblems.length===0) {
      return res
        .status(404)
        .json({ success: false, message: "There is no problem list" });
    }
    res.status(200).json({ success: true, allProblems });
    next();
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Failed to fetch the problems" });
  }
};
module.exports.addProblem = async (req, res, next) => {
  try {
    const { title, statement, difficulty } = req.body;
    if (!(title && statement && difficulty)) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the required fields",
      });
    }
    const problem = await problems.create({
      title,
      statement,
      difficulty,
    });
    res.status(201).json({ success: true, message: "problem added", problem });
    next();
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Failed to add the problems" });
  }
};
module.exports.getProblem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const problem = await problems.findById(id);
    if (!problem) {
      return res
        .status(404)
        .json({ success: false, message: "Problem not found" });
    }
    res.status(200).json({ success: true, problem });
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.updateProblem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const upProblem = await problems.findById(id);
    const updatedProblem = await problems.findByIdAndUpdate(id, {
      title: req.body.title || upProblem.title,
      statement: req.body.statement || upProblem.statement,
      difficulty: req.body.difficulty || upProblem.difficulty,
    });
    if (!updatedProblem) {
      return res
        .status(404)
        .json({ success: false, message: "Problem not found" });
    }
    res.status(201).json({ success: true, message: "Problem get Updated" });
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.filterProblem = async (req, res, next) => {
  try {
    const diff = req.params.diff;
    const filteredProblems = await problems.find({ difficulty: diff });
    if (!filteredProblems) {
      return res.status(404).json({
        success: false,
        message: "This difficulty problem is not found",
      });
    }
    res.status(200).json({ success: true, filteredProblems });
    next();
  } catch (error) {
    return res.status(400).json({ success: true, message: error.message });
  }
};
module.exports.deleteProblem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedProblem = await problems.findByIdAndDelete(id);
    if (!deletedProblem) {
      return res
        .status(404)
        .json({ success: false, message: "Problem not found" });
    }
    res.status(200).json({ success: true, message:"Problem gets deleted" });
    next();
  } catch (error) {
    return res.statu(400).json({ success: false, message: error.message });
  }
};
