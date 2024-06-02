const express = require("express");
const {generateFile} = require("./generateFile.js");
const {generateInputFile} = require("./generateInputFile.js");
const {executeCode} = require("./executeCode.js");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from Compiler");
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code, input } = req.body;
  if (code === undefined) {
    return res
      .status(404)
      .json({ success: false, message: "Please Enter your code" });
  }
  try {
    const filePath = await generateFile(language, code);
    const inputPath = await generateInputFile(input);
    const output = await executeCode(filePath, inputPath);
    res.status(200).json({ success: true, output });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
