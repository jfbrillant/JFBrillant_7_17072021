const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  postValidationRules,
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
  postValidationRules(),
  validate,
  postCtrl.createPost
);
router.put("/:id", auth, multer, postValidationRules(), validate, postCtrl.editPost);
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;