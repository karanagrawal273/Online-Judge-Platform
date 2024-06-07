const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const executePySubmitCode = async (filePath, inputTestcases, outputTestcases) => {
  const inputPath = path.join(__dirname, "../Inputs");
  const codePath = path.dirname(filePath);
  if (!fs.existsSync(inputPath)) {
    fs.mkdirSync(inputPath, { recursive: true });
  }
  const jobId = path.basename(filePath).split(".")[0];
  const inPath = path.join(inputPath, `${jobId}.txt`);

  try {
    if (inputTestcases === null) {
      inputTestcases = "";
    }
    if (outputTestcases === null) {
      outputTestcases = "";
    }
    const inputs = inputTestcases.split(",");
    const outputs = outputTestcases.split(",");
    await fs.writeFileSync(inPath, inputs[0]);
    const out = await new Promise((resolve, reject) => {
      exec(
        `cd ${codePath} && python ${jobId}.py < ${inPath}`,
        (error, stdout, stderr) => {
          if (error) {
            reject(error);
          }
          if (stderr) {
            reject(stderr);
          }
          resolve(stdout);
        }
      );
    });
    if (!outputs.length) {
      if (out != "") {
        throw "Output not matches";
      }
    } else {
      if (out.trim() != outputs[0].trim()) {
        throw "Output not matches";
      }
    }
    for (let i = 1; i < inputs.length; i++) {
      await fs.writeFileSync(inPath, inputs[i]);
      const out = await new Promise((resolve, reject) => {
        exec(
          `cd ${codePath} && python ${jobId}.py < ${inPath}`,
          (error, stdout, stderr) => {
            if (error) {
              reject(error);
            }
            if (stderr) {
              reject(stderr);
            }
            resolve(stdout);
          }
        );
      });
      if (!outputs.length) {
        if (out != "") {
          throw "Output not matches";
        }
      } else {
        if (out.trim() != outputs[i].trim()) {
          throw "Output not matches";
        }
      }
    }
    const result = "All testcases are passed. Code accepted successfully";
    return result;
  } catch (error) {
    return error;
  }
};
module.exports = { executePySubmitCode };
