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

exports.modifyPost = (req, res) => {
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
          .then(() => {
            models.Post.findOne({
              where: { id: req.body.postId },
            })
              .then((postFound) => {
                if (postFound) {
                  postFound
                    .update({
                      comments: postFound.dataValues.comments + 1,
                    })
                    .then(() =>
                      res.status(201).json({
                        message:
                          "Compteur de commentaires du post mis à jour !",
                      })
                    )
                    .catch(() =>
                      res.status(500).json({
                        error:
                          "Echec lors de la mise à jour du compteur de commentaires du post",
                      })
                    );
                } else {
                  res
                    .status(404)
                    .json({ error: "Pas de commentaires ayant cet id !" });
                }
              })
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

exports.modifyComment = (req, res) => {
  models.Comment.findOne({
    where: {
      id: req.params.commentid,
    },
    include: [
      {
        model: models.User,
        attributes: ["id", "isAdmin"],
      },
    ],
  }).then((commentFound) => {
    console.log(commentFound)
    if (
      commentFound &&
      (commentFound.User.dataValues.isAdmin || commentFound.dataValues.userId === commentFound.User.dataValues.id)
    ) {
      commentFound
        .update(
          {content: req.body.content},
          {where: {
            id: req.body.commentId
          }}
        )
        .then(() =>
          res.status(201).json({
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
  });
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
  }).then((commentFound) => {
    if (
      commentFound &&
      (commentFound.User.dataValues.isAdmin || commentFound.dataValues.userId === commentFound.User.dataValues.id)
    ) {
      commentFound
        .destroy()
        .then(() => {
          models.Post.findOne({
            where: { id: req.params.postid },
          })
            .then((postFound) => {
              if (postFound) {
                postFound
                  .update({
                    comments: postFound.dataValues.comments - 1,
                  })
                  .then(() =>
                    res.status(201).json({
                      message:
                        "Compteur de commentaires du post mis à jour !",
                    })
                  )
                  .catch(() =>
                    res.status(500).json({
                      error:
                        "Echec lors de la mise à jour du compteur de commentaires du post",
                    })
                  );
              } else {
                res
                  .status(404)
                  .json({ error: "Pas de post ayant cet id !" });
              }
            })
            .catch(() =>
              res.status(500).json({
                error: "Echec de la recherche du post !",
              })
            );
        })
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