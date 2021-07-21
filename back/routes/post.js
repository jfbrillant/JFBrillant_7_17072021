const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  postValidationRules,
  validate
} = require("../middlewares/validator");
const multer = require("../middlewares/multer-config");
const postCtrl = require("../controllers/post");

router.get("/", auth, postCtrl.getAllPosts);
router.post(
  "/",
  auth,
  multer,
  postCtrl.createPost
);
// router.get("/:id", auth, postCtrl.getOnePost);
// router.put(
//   "/:id",
//   auth,
//   multer,
//   postValidationRules(),
//   validate,
//   postCtrl.modifyPost
// );
// router.delete("/:id", auth, postCtrl.deletePost);
// router.post("/:id/like", auth, postCtrl.likePost);

module.exports = router;
