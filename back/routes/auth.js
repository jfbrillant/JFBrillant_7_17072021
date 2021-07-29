const express = require("express");
const router = express.Router();

const { signUpValidationRules, loginValidationRules, validate } = require("../middlewares/validator");
const authCtrl = require("../controllers/auth");

router.post("/signup", signUpValidationRules(), validate, authCtrl.signup);
router.post("/login", loginValidationRules(), validate, authCtrl.login);

module.exports = router;