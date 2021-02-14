const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
  let token = req.headers.authorization;

  if (token) {
    token = token.substring(7);
  }

  if (!token) {
    return res.status(401).json({
      msg: "Token is required.",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = payload.uid;
    req.username = payload.username;
  } catch (error) {
    return res.status(401).json({
      msg: "Invalid token.",
    });
  }

  next();
};

module.exports = { validateJWT };
