const { response } = require("express");
const bcrypt = require("bcryptjs");

// Models
const User = require("../models/Users");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  const emailExist = await User.findOne({ email });
  const user = new User(req.body);

  // Encrypt password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  try {
    if (emailExist) {
      return res.status(400).json({
        msg: "This email already in use.",
      });
    }

    await user.save();

    res.status(201).json({
      uid: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong, please contact an administrator"
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  try {
    
    if (!user) {
      return res.status(400).json({
        msg: "The email or password is incorrect.",
      });
    }
    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        msg: "The email or password is incorrect.",
      });
    }

    res.status(200).json({
      uid: user.id,
      name: user.name,
      email: user.email,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong, please contact an administrator"
    });
  }
};

const renewToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = { createUser, loginUser, renewToken };