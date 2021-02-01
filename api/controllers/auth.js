const { response } = require("express");
const bcrypt = require("bcryptjs");

// JWT
const { generateJWT } = require("../helpers/jwt");

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

    // Generate jwt
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      uid: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong, please contact an administrator",
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

    // Generate jwt
    const token = await generateJWT(user.id, user.name);

    res.status(200).json({
      uid: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong, please contact an administrator",
    });
  }
};

const renewToken = async (req, res = response) => {
  const { uid, name } = req;

  // Generate jwt
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    token,
  });
};

module.exports = { createUser, loginUser, renewToken };
