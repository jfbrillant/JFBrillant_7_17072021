const models = require("../models");


exports.getLikes = (req, res) => {
  models.Like.findAndCountAll({
    where: {
      postId: req.params.postid,
    },
  })
  .then((likes) => {
    if (likes) {
      res.status(200).json({
        postId: req.params.postid,
        rows: likes.rows,
        count: likes.count
      });
    } else {
      res.status(404).json({ message: "Pas de likes à afficher !" });
    }
  })
.catch(() =>
  res.status(500).json({
    error: "Echec de la recherche des likes",
  })
);
};

exports.createLike = (req, res) => {
  console.log(req.body)
  models.User.findOne({
    where: { id: req.params.verifiedUserID },
  })
    .then((userFound) => {
      if (userFound) {
        models.Like.create({
          postId: req.body.postId,
          userId: req.params.verifiedUserID,
        })
          .then(() =>
            res.status(201).json({
              message: "Like créé !",
            })
          )
          .catch(() =>
            res.status(500).json({
              error: "Echec lors de l'enregistrement du like",
            })
          );
      }
    })
    .catch(() =>
      res.status(500).json({
        error: "impossible de vérifier l'utilisateur",
      })
    );
};

exports.deleteLike = (req, res) => {
  models.Like.findOne({
    where: {
      postId: req.params.postid,
      userId: req.params.verifiedUserID,
    },
  }).then((likeFound) => {
    if (likeFound) {
      likeFound
        .destroy()
        .then(() =>
          res.status(201).json({
            message: "Like supprimé !",
          })
        )
        .catch(() =>
          res.status(500).json({
            error: "Echec de le suppression du like",
          })
        );
    } else {
      res.status(404).json({
        error: "Pas de like ayant cet id !",
      });
    }
  });
};
