const models = require("../models");

exports.getComments = (req, res, next) => {
  models.Comment.findAll({
    where: { postId: req.params.id },
    attributes: ["id", "userId", "postId", "content", "createdAt"],
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: models.User,
        attributes: ["firstname", "lastname"],
      },
    ],
  })
    .then((comments) => {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ error: "Pas de commentaires à afficher !" });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "Echec lors de la récupération des commentaires",
      });
    });
};

exports.createComment = (req, res, next) => {
  models.User.findOne({
    where: { id: req.params.verifiedUserID },
  })
    .then((userFound) => {
      if (userFound) {
        const newComment = models.Comment.create({
          content: req.body.content,
          postId: req.body.postId,
          userId: req.params.verifiedUserID,
        });
        newComment
          .then(() =>
            res.status(201).json({
              message: "Commentaire créé !",
            })
          )
          .catch(() =>
            res.status(500).json({
              error: "Echec lors de l'enregistrement du commentaire",
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

exports.editComment = (req, res) => {
  models.Comment.findOne({
    attributes: ["id", "userId", "postId", "content", "createdAt", "updatedAt"],
    where: {
      id: req.params.commentid,
    },
    include: [
      {
        model: models.User,
        attributes: ["id", "isAdmin"],
      },
    ],
  })
    .then((commentFound) => {
      if (
        commentFound &&
        (commentFound.User.isAdmin ||
          commentFound.userId === commentFound.User.id)
      ) {
        models.Comment.update(
          { content: req.body.content },
          {
            where: {
              id: req.params.commentid,
            },
          }
        )
          .then(() =>
            res.status(202).json({
              message: "commentaire modifié !",
            })
          )
          .catch(() =>
            res.status(500).json({
              error: "Echec lors de la modification du commentaire",
            })
          );
      } else {
        res.status(404).json({
          error: "le commentaire n'a pas été trouvé",
        });
      }
    })
    .catch(() =>
      res.status(500).json({
        error: "Echec lors de la recherche du commentaire",
      })
    );
};

exports.deleteComment = (req, res) => {
  models.Comment.findOne({
    where: { id: req.params.commentid },
    include: [
      {
        model: models.User,
        attributes: ["id", "isAdmin"],
      },
    ],
  })
    .then((commentFound) => {
      if (
        commentFound &&
        (commentFound.User.dataValues.isAdmin ||
          commentFound.dataValues.userId === commentFound.User.dataValues.id)
      ) {
        models.Comment.destroy({
          where: { id: req.params.commentid },
        })
          .then(() =>
            res.status(201).json({
              message: "Commentaire supprimé !",
            })
          )
          .catch(() =>
            res.status(500).json({
              error: "Echec de le suppression du commentaire",
            })
          );
      } else {
        res.status(404).json({
          error: "Pas de commentaires ayant cet id !",
        });
      }
    })
    .catch(() =>
      res.status(500).json({
        error: "Echec de de la recherche du commentaire",
      })
    );
};
