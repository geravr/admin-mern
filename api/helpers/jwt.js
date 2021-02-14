const jwt = require("jsonwebtoken");

const generateJWT = (uid, username) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, username };

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
