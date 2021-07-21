const models = require("../models");
const fs = require("fs");

exports.getAllPosts = (req, res, next) => {
  const fields = req.query.fields;
  const limit = parseInt(req.query.limit);
  const offset = parseInt(req.query.offset);
  const order = req.query.order;

  models.Post.findAll({
    order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
    attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
    limit: (!isNaN(limit)) ? limit : null,
    offset: (!isNaN(offset)) ? offset : null,
    include: [{
      model: models.User,
      attributes: [ 'firstname', 'lastname' ]
    }]
  }) 
    .then((posts) => {
      if(posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({error: "Pas de messages à afficher !"});
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "Echec lors de la récupération des posts",
      });
    });
};

exports.createPost = (req, res, next) => {
  models.User.findOne({
    where: { id: req.params.verifiedUserID},
  })
    .then((userFound) => {
      if (userFound) {
        const newPost = models.Post.create({
          title: req.body.title,
          attachment: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
          likes: 0,
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
