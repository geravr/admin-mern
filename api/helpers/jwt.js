const jwt = require("jsonwebtoken");

const generateJWT = (id, username) => {
  return new Promise((resolve, reject) => {
    const payload = { id, username };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      },
      (error, token) => {
        if (error) {
          console.log(err);
          reject("Token could not be generated.");
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
