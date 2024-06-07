const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const executePyCode = async (filePath, inputPath) => {
  const codePath = path.dirname(filePath);
  const jobId = path.basename(filePath).split(".")[0];

  return new Promise((resolve, reject) => {
    exec(
      `cd ${codePath} && python ${jobId}.py < ${inputPath}`,
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
};
module.exports = { executePyCode };
