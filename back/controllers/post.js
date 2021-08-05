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
      {
        model: models.Like,
        attributes: {
          include: [
            [
              Sequelize.literal(
                `(SELECT COUNT(*) FROM likes WHERE postId = Post.id)`
              ),
              "num_likes",
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
      {
        model: models.Like,
        attributes: {
          include: [
            [
              Sequelize.literal(
                `(SELECT COUNT(*) FROM likes WHERE postId = Post.id)`
              ),
              "num_likes",
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
      } else {
        res.status(500).json({
          error: "utilisateur non trouvé",
        })
      }
    })
    .catch(() =>
      res.status(500).json({
        error: "Impossible de créer un post sans image ou gif",
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