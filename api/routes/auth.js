const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

// Constrollers
const { createUser, loginUser, renewToken } = require("../controllers/auth");

// Middleware
const { validateFields } = require("../middlewares/field-validators");

const validations = {
  nameRequired: check("name", "name is required").not().isEmpty(),
  emailRequired: check("email", "email is required").not().isEmpty(),
  isValidEmail: check("email", "email is incorrect").isEmail(),
  passwordRequired: check("password", "password is required").not().isEmpty(),
  isValidPassword: check(
    "password",
    "password must be at least 6 characters"
  ).isLength({
    min: 6,
  }),
};

router.post(
  "/new",
  [
    validations.nameRequired,
    validations.emailRequired,
    validations.isValidEmail,
    validations.passwordRequired,
    validations.isValidPassword,
    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    validations.emailRequired,
    validations.isValidEmail,
    validations.passwordRequired,
    validateFields,
  ],
  loginUser
);

router.get("/renew", renewToken);

module.exports = router;
