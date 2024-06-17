const User = require("../Model/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res, next) => {
  try {
    const { firstname, lastname, phone, email, password } = req.body;

    if (!(firstname && lastname && phone && email && password)) {
      return res
        .status(404)
        .json({ success: false, message: "Please enter all the informations" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(404)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const existsUser = await User.create({
      firstname,
      lastname,
      phone,
      email,
      password: hashedPass,
    });

    const token = jwt.sign({ id: existsUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    existsUser.token = token;
    existsUser.password = undefined;

    const options = {
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
      secure: true,
      sameSite: "None",
    };

    res.cookie("token", token, options);
    res.status(200).json({
      message: "Successfully registered !!",
      success: true,
      // existsUser,
    });
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(404).json({
        success: false,
        message: "All the Information are required to get login",
      });
    }

    const existsUser = await User.findOne({ email });
    if (!existsUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't get Registered",
      });
    }

    const enteredPass = await bcrypt.compare(password, existsUser.password);
    if (!enteredPass) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid login credentials" });
    }

    const token = jwt.sign({ id: existsUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    // console.log(token);
    const options = {
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
      withCredentials: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("token", token, options);
    res.status(200).json({
      message: "Successfully Logged in!!",
      success: true,
      // token,
    });
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token", { path: "/", domain: ".vercel.app" });
    console.log(res.cookie.token);
    res.status(200).json({ success: true, message: "Successfully Logout" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
