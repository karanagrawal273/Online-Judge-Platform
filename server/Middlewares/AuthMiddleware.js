const User = require("../Model/User.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).send("Token not found");
  }
  jwt.verify(token, process.env.SECRET_KEY, async (error, data) => {
    if (error) {
      return res.status(400).send(error.message);
    } else {
      const user = await User.findById(data.id);
      if (user) return res.status(200).send("User verified", user);
      else return res.status(400).send("Error: User not found");
    }
  });
};
