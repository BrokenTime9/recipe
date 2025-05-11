const express = require("express");
const { authCheckup } = require("../auth/auth.validator.js");
const { register, login } = require("../auth/auth.controller.js");
const router = express.Router();

router.post("/register", authCheckup, register);
router.post("/login", authCheckup, login);

module.exports = router;
