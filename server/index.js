const express = require("express");
const { DBConnection } = require("./Database/db.js");
const User = require("./Model/User.js");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const AuthRoute = require("./Routes/AuthRoute");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

DBConnection();

app.use("/", AuthRoute);

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
