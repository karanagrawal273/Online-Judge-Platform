const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const { exec } = require("child_process");
const { stdout, stderr } = require("process");
const generateFile = async (format, code) => {
  const dirCodes = path.join(__dirname, "../Codes");
  if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
  }
  const jobId = uuid();
  const fileName = `${jobId}.${format}`;
  const filePath = path.join(dirCodes, fileName);
  await fs.writeFileSync(filePath, code);
  return filePath;
};
const executeCode = async (filePath) => {
  const outputPath = path.join(__dirname, "../Outputs");
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  const jobId = path.basename(filePath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.exe`);

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe`,
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
module.exports.runCode = async (req, res, next) => {
  const { language = "cpp", code } = req.body;
  if (code === undefined) {
    return res
      .status(404)
      .json({ success: false, message: "Please Enter your code" });
  }
  try {
    const filePath = await generateFile(language, code);
    const output = await executeCode(filePath);
    res.status(200).json({ success: true, output });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
