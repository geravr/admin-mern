const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

// Constrollers
const { loginUser, whoami } = require("../controllers/auth");

// Middleware
const { validateFields } = require("../middlewares/fields-validator");
const { validateJWT } = require("../middlewares/jwt-validator");

const validations = {
  usernameRequired: check("username", "username is required").not().isEmpty(),
  passwordRequired: check("password", "password is required").not().isEmpty(),
};

router.post(
  "/obtain",
  [
    validations.usernameRequired,
    validations.passwordRequired,
    validateFields,
  ],
  loginUser
);

router.get("/whoami", validateJWT, whoami);

module.exports = router;
