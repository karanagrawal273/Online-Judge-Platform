const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const executeJavaSubmitCode = async (filePath, inputTestcases, outputTestcases) => {
  const outputPath = path.join(__dirname, "../Outputs");
  const inputPath = path.join(__dirname, "../Inputs");
  const codePath = path.dirname(filePath);
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
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
        `javac ${filePath} -d ${outputPath} && cd ${codePath} && java ${jobId}.java < ${inPath}`,
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
          `cd ${codePath} && java ${jobId}.java < ${inPath}`,
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
    const result = "Accepted";
    return result;
  } catch (error) {
    throw error;
  }
};
module.exports = { executeJavaSubmitCode };
