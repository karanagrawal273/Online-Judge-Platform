const User = require("../Model/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res, next) => {
  try {
    const { firstname, lastname, phone, email, password } = req.body;

    if (!(firstname && lastname && phone && email && password)) {
      return res.json({message:"Please enter all the informations"});
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.json({message:"User already exists"});
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
      expiresIn: "1d",
    });

    existsUser.token = token;
    existsUser.password = undefined;

    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      message: "Successfully registered !!",
      success: true,
      existsUser,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res
        .json({message:"All the Information are required to get login"});
    }

    const existsUser = await User.findOne({ email });
    if (!existsUser) {
      return res.json({message:"User doesn't get Registered"});
    }

    const enteredPass = await bcrypt.compare(password, existsUser.password);
    if (!enteredPass) {
      return res.json({message:"Invalid login credentials"});
    }

    const token = jwt.sign({ id: existsUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    existsUser.token = token;
    existsUser.password = undefined;
    // console.log(token);
    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      withCredentials: true,
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      message: "Successfully Logged in!!",
      success: true,
      token,
    });
    next();
  } catch (error) {
    console.log(error.message);
  }
};
