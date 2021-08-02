const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  commentValidationRules,
  validate,
} = require("../middlewares/validator");
const commentCtrl = require("../controllers/comments");

router.get("/:id/comment", auth, commentCtrl.getComments);
router.post("/:id/comment", auth, commentValidationRules(), validate, commentCtrl.createComment);
router.put("/:postid/comment/:commentid", auth, commentValidationRules(), validate, commentCtrl.editComment);
router.delete("/:postid/comment/:commentid", auth, commentCtrl.deleteComment);

module.exports = router;