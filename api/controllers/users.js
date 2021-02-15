const { response } = require("express");
const bcrypt = require("bcryptjs");

// JWT
const { generateJWT } = require("../helpers/jwt");

// Models
const User = require("../models/User");

/*************** GET - list ***************/
const getUsers = async (req, res = response) => {
  // Query filters
  const { limit = 10, page = 1, name, email } = req.query;
  const count = await User.countDocuments();
  const totalPages = Math.ceil(count / limit);
  let query = {};
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }
  if (email) {
    query.email = { $regex: email, $options: "i" };
  }

  try {
    const users = await User.find(query, "-password")
      .populate("groups", "name")
      .limit(limit * 1)
      .skip((page - 1) * limit);
    return res.json({
      count,
      totalPages,
      results: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong, please contact an administrator.",
    });
  }
};

/*************** GET - detail ***************/
const getUser = async (req, res = response) => {
  const userID = req.params.id;

  try {
    const user = await User.findById(userID, "-password");
    return res.json({
      results: [user],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong, please contact an administrator.",
    });
  }
};

/*************** POST ***************/
const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  const emailExist = await User.findOne({ email });
  const user = new User(req.body);

  // Encrypt password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  if (emailExist) {
    return res.status(400).json({
      msg: "This email is already in use.",
    });
  }

  try {
    await user.save();

    // Generate jwt
    const token = await generateJWT(user.id, user.firstName);

    res.status(201).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      groups: user.groups,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong, please contact an administrator.",
    });
  }
};

/*************** PATCH ***************/
const updateUser = async (req, res = response) => {
  const userID = req.params.id;
  const userDataToUpdate = req.body;

  try {
    const userToUpdate = await User.findById(userID);

    if (!userToUpdate) {
      return res.status(404).json({
        msg: "User not found.",
      });
    }
    const userUpdated = await User.findByIdAndUpdate(userID, userDataToUpdate, {
      new: true,
    });
    return res.json({
      userUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Something went wrong, please contact an administrator.",
    });
  }
};

/*************** DELETE ***************/
const deleteUser = async (req, res = response) => {
  const userID = req.params.id;

  try {
    const userToDelete = await User.findById(userID);

    if (!userToDelete) {
      return res.status(404).json({
        msg: "User not found.",
      });
    }
    await User.findByIdAndDelete(userID);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({
      msg: "Something went wrong, please contact an administrator.",
    });
  }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
