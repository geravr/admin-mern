const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({
      msg: "Token is required.",
    });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.uid = payload.uid;
    req.name = payload.name;

  } catch (error) {
    return res.status(401).json({
      msg: "Invalid token."
    })
  }

  next();
};

module.exports = { validateJWT };
