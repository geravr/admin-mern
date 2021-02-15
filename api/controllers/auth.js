const { response } = require("express");
const bcrypt = require("bcryptjs");

// JWT
const { generateJWT } = require("../helpers/jwt");

// Models
const User = require("../models/User");

const loginUser = async (req, res = response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  try {
    if (!user) {
      return res.status(400).json({
        msg: "The username or password is incorrect.",
      });
    }
    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        msg: "The username or password is incorrect.",
      });
    }

    // Generate jwt
    const accessToken = await generateJWT(user.id, user.username);

    res.status(200).json({
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
      group: user.group,
      token: { access: accessToken },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong, please contact an administrator",
    });
  }
};

const whoami = async (req, res = response) => {
  const { id, username } = req;

  // Renew token
  const accessToken = await generateJWT(id, username);

  try {
    const user = await User.findById(id, "username email group isAdmin");
    res.json({
      results: [{
        token: { access: accessToken },
        user
      }],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong, please contact an administrator",
    });
  }
};

module.exports = { loginUser, whoami };
