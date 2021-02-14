const { Router } = require("express");
const { check } = require("express-validator");

// Constrollers
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

// Middleware
const { validateFields } = require("../middlewares/fields-validator");
const { validateJWT } = require("../middlewares/jwt-validator");

const validations = {
  firstNameRequired: check("firstName", "first name is required").not().isEmpty(),
  usernameRequired: check("username", "username is required").not().isEmpty(),
  emailRequired: check("email", "email is required").not().isEmpty(),
  isValidEmail: check("email", "email is incorrect").isEmail(),
  passwordRequired: check("password", "password is required").not().isEmpty(),
  isValidPassword: check(
    "password",
    "password must be at least 8 characters"
  ).isLength({
    min: 8,
  }),
};

const router = Router();

router.use(validateJWT);

router.get("/", getUsers);

router.get("/:id", getUser);

router.post(
  "/",
  [
    validations.firstNameRequired,
    validations.usernameRequired,
    validations.emailRequired,
    validations.isValidEmail,
    validations.passwordRequired,
    validations.isValidPassword,
    validateFields,
  ],
  createUser
);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
