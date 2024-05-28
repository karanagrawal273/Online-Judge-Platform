const mongoose = require("mongoose");
const User = require("./User.js");

const problemsSchema = new mongoose.Schema({
  title: {
    type: String,
    default: null,
    trim: true,
    required: [true, "Problem title is required"],
  },
  statement: {
    type: String,
    default: null,
    trim: true,
    required: [true, "Problem statement is required"],
  },
  difficulty: {
    type: String,
    default: null,
    trim: true,
    required: [true, "Problem difficulty is required"],
  },
  input: {
    constraints: {
      type: String,
      default: null,
      trim: true,
    //   required: [true, "Problem constraints is required"],
    },
    sample: {
      type: String,
      default: null,
      trim: true,
    //   required: [true, "Problem sample input is required"],
    },
  },
  output: {
    constraints: {
      type: String,
      default: null,
      trim: true,
    //   required: [true, "Output constraints is required"],
    },
    sample: {
      type: String,
      default: null,
      trim: true,
    //   required: [true, "Problem sample output is required"],
    },
  },
  testcases: {
    input: {
      type: String,
      default: null,
      trim: true,
    },
    output: {
      type: String,
      default: null,
      trim: true,
    },
  },
  submissions: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      default: null,
      submission: [
        {
          language: {
            type: String,
            default: null,
          },
          solution: {
            type: String,
            default: null,
          },
          verdict: {
            type: String,
            default: null,
          },
          submissionDateTime: {
            type: Date,
            default: new Date("2024-05-27T14:05:10Z"),
          },
          timeTaken: {
            type: Number,
            default: 0,
          },
        },
      ],
    },
  },
});

module.exports = mongoose.model("problem", problemsSchema);
