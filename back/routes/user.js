const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { signUpValidationRules, loginValidationRules, validate } = require("../middlewares/validator");
const userCtrl = require("../controllers/user");

router.get("/:id", auth, userCtrl.getUser);
router.put("/:id", auth, userCtrl.editUser);
router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;