const models = require("../models");
const fs = require("fs");

exports.getAllPosts = (req, res, next) => {
  const fields = req.query.fields;
  const limit = parseInt(req.query.limit);
  const offset = parseInt(req.query.offset);
  const order = req.query.order;

  models.Post.findAll({
    order: [order != null ? order.split(":") : ["createdAt", "DESC"]],
    attributes: fields !== "*" && fields != null ? fields.split(",") : null,
    limit: !isNaN(limit) ? limit : null,
    offset: !isNaN(offset) ? offset : null,
    include: [
      {
        model: models.User,
        attributes: ["firstname", "lastname"],
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
          .then(() => {
            models.Post.findOne({
              where: { id: req.body.postId },
            })
              .then((postFound) => {
                res.status(201).json({
                  message: "Commentaire créé !",
                });
              })
              // .then((postFound) => {
              //   if (postFound) {
              //     models.Post.update({
              //       comments: postFound.comments + 1,
              //     })
              //       .then(() =>
              //         res.status(201).json({
              //           message:
              //             "Compteur de commentaires du post mis à jour !",
              //         })
              //       )
              //       .catch(() =>
              //         res.status(500).json({
              //           error:
              //             "Echec lors de la mise à jour du compteur de commentaires du post",
              //         })
              //       );
              //   } else {
              //     res
              //       .status(404)
              //       .json({ error: "Pas de commentaires ayant cet id !" });
              //   }
              // })
              .catch(() =>
                res.status(500).json({
                  error: "Echec de la recherche du commentaire !",
                })
              );
          })
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
