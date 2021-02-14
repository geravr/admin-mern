const { Router } = require("express");

// Constrollers
const { getPermissions } = require("../controllers/permissions");

// Middleware
const { validateJWT } = require("../middlewares/jwt-validator");

const router = Router();

router.get("/", validateJWT, getPermissions);

module.exports = router;
