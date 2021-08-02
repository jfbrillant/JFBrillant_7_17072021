const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const likeCtrl = require("../controllers/likes");

router.get("/:postid/like", auth, likeCtrl.getLikes);
router.post("/:postid/like", auth, likeCtrl.createLike);
router.delete("/:postid/like", auth, likeCtrl.deleteLike);

module.exports = router;