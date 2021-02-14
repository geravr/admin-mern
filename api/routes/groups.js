const { Router } = require("express");
const { check } = require("express-validator");

// Constrollers
const {
  getGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
} = require("../controllers/groups");

// Middleware
const { validateFields } = require("../middlewares/fields-validator");
const { validateJWT } = require("../middlewares/jwt-validator");

const router = Router();

const validations = {
  nameRequired: check("name", "name is required").not().isEmpty(),
};

router.use(validateJWT);

router.get("/", getGroups);

router.get("/:id", getGroup);

router.post("/", [validations.nameRequired, validateFields], createGroup);

router.patch("/:id", updateGroup);

router.delete("/:id", deleteGroup);

module.exports = router;
