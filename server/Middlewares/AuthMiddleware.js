const User = require("../Model/User.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    console.log("token not found");
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.SECRET_KEY, async (error, data) => {
    if (error) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) {
        console.log(user.firstname);
        return res.json({ status: true, user: user.firstname,token });
      } else return res.json({ status: false });
    }
  });
};
