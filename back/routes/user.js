const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { userValidationRules, validate } = require("../middlewares/validator");
const userCtrl = require("../controllers/user");

router.get("/:id", auth, userCtrl.getUser);
router.put("/:id", auth, userValidationRules(), validate, userCtrl.editUser);
router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;