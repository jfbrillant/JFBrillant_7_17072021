const express = require("express");
const router = express.Router();

const { signUpValidationRules, loginValidationRules, validate } = require("../middlewares/validator");
const userCtrl = require("../controllers/user");

router.post("/signup", signUpValidationRules(), validate, userCtrl.signup);
router.post("/login", loginValidationRules(), validate, userCtrl.login);

module.exports = router;