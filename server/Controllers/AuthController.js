const User = require("../Model/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res, next) => {
  try {
    const { firstname, lastname, phone, email, password } = req.body;

    if (!(firstname && lastname && phone && email && password)) {
      return res
        .status(400)
        .send("All the Information are required to get registered");
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("User Already Registered");
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
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      message: "Successfully registered !!",
      success: true,
      token,
    });
    next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res
        .status(400)
        .send("All the Information are required to get login");
    }

    const existsUser = await User.findOne({ email });
    if (!existsUser) {
      return res.status(200).send("User doesn't get Registered");
    }

    const enteredPass = bcrypt.compare(password, existsUser.password);
    if (!enteredPass) {
      return res.status(401).send("Invalid login credentials");
    }

    const token = jwt.sign({ id: existsUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    existsUser.token = token;
    existsUser.password = undefined;

    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      message: "Successfully Logged in!!",
      success: true,
      token,
    });
    next();
  } catch (error) {
    console.log(error.message);
  }
};
