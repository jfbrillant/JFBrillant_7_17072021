const models = require("../models");
const fs = require("fs");
const Sequelize = require("sequelize");

exports.getAllPosts = (req, res, next) => {
  models.Post.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: models.User,
        attributes: ["firstname", "lastname"],
      },
      {
        model: models.Comment,
        attributes: {
          include: [
            [
              Sequelize.literal(
                `(SELECT COUNT(*) FROM comments WHERE postId = Post.id)`
              ),
              "num_comments",
            ],
          ],
        },
      },
    ],
  })
    .then((posts) => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ error: "Pas de post à afficher !" });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "Echec lors de la récupération des posts",
      });
    });
};

exports.getOnePost = (req, res, next) => {
  models.Post.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: models.User,
        attributes: ["firstname", "lastname"],
      },
      {
        model: models.Comment,
        attributes: {
          include: [
            [
              Sequelize.literal(
                `(SELECT COUNT(*) FROM comments WHERE postId = ${req.params.id})`
              ),
              "num_comments",
            ],
          ],
        },
      },
    ],
  })
    .then((onePost) => {
      if (onePost) {
        res.status(200).json(onePost);
      } else {
        res.status(404).json({ error: "Pas de message à afficher !" });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "Echec lors de la récupération du post",
      });
    });
};

exports.createPost = (req, res, next) => {
  console.log(req.params.verifiedUserID);
  models.User.findOne({
    where: { id: req.params.verifiedUserID },
  })
    .then((userFound) => {
      if (userFound) {
        const newPost = models.Post.create({
          title: req.body.title,
          attachment: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
          likes: 0,
          comments: 0,
          UserId: req.params.verifiedUserID,
        });
        newPost
          .then(() =>
            res.status(201).json({
              message: "Post enregistrée !",
            })
          )
          .catch(() =>
            res.status(500).json({
              error: "Echec lors de l'enregistrement du post",
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

exports.editPost = (req, res) => {
  models.Post.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: models.User,
        attributes: ["id", "isAdmin"],
      },
    ],
  }).then((postFound) => {
    if (
      postFound &&
      (postFound.User.isAdmin || postFound.userId === postFound.User.id)
    ) {
      const postToModify = req.file
        ? {
            title: req.body.title,
            attachment: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          }
        : {
            title: req.body.title,
          };
      postFound
        .update({
          ...postToModify,
        })
        .then(() =>
          res.status(201).json({
            message: "Post modifié !",
          })
        )
        .catch(() =>
          res.status(500).json({
            error: "Echec lors de la modification du post",
          })
        );
    } else {
      res.status(404).json({
        error: "le post n'a pas été trouvé",
      });
    }
  });
};

exports.deletePost = (req, res, next) => {
  models.Post.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: models.User,
        attributes: ["id", "isAdmin"],
      },
    ],
  })
    .then((postFound) => {
      if (
        postFound &&
        (postFound.User.isAdmin || postFound.userId === postFound.User.id)
      ) {
        const filename = postFound.attachment.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          postFound
            .destroy({
              where: { id: req.params.id },
            })
            .then(() => {
              res.status(204).json({
                message: "Post supprimé !",
              });
            })
            .catch(() => {
              res.status(500).json({
                error: "Echec lors de la suppression du post",
              });
            });
        });
      } else {
        res.status(404).json({
          error: "le post n'a pas été trouvé",
        });
      }
    })
    .catch(() =>
      res.status(500).json({
        error: "impossible de vérifier le post",
      })
    );
};

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
