const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  submitPostValidationRules,
  validate,
} = require("../middlewares/validator");
const multer = require("../middlewares/multer-config");
const postCtrl = require("../controllers/post");

// Routes Posts
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
router.put("/:id", auth, multer, postCtrl.editPost);
router.delete("/:id", auth, postCtrl.deletePost);

// Routes commentaires
router.get("/:id/comment", auth, postCtrl.getComments);
router.post("/:id/comment", auth, postCtrl.createComment);
router.put("/:postid/comment/:commentid", auth, multer, postCtrl.editComment);
router.delete("/:postid/comment/:commentid", auth, postCtrl.deleteComment);

module.exports = router;
