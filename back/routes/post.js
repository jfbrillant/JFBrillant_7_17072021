const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  submitPostValidationRules,
  validate,
} = require("../middlewares/validator");
const multer = require("../middlewares/multer-config");
const postCtrl = require("../controllers/post");

router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.post(
  "/",
  auth,
  multer,
  submitPostValidationRules(),
  validate,
  postCtrl.createPost
);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);

router.get("/:id/comment", auth, postCtrl.getComments);
router.post("/:id/comment", auth, postCtrl.createComment);

module.exports = router;
