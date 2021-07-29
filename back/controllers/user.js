const models = require("../models");

exports.getUser = (req, res) => {
  models.User.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "Pas d'utilisateur trouvé !" });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "Echec lors de la récupération de l'utilisateur",
      });
    });
};

exports.editUser = (req, res) => {
  models.User.findOne({
    where: { id: req.params.id },
  })
    .then((userFound) => {
      userFound.id
      if (userFound && (userFound.isAdmin || req.params.id == userFound.id)) {
        models.User.update(
          {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        )
          .then(() =>
            res.status(202).json({
              message: "Utilisateur modifié !",
            })
          )
          .catch(() =>
            res.status(500).json({
              error: "Echec lors de la modification de l'utilisateur",
            })
          );
      } else {
        res.status(404).json({
          error: "l'utilisateur' n'a pas été trouvé",
        });
      }
    })
    .catch(() =>
      res.status(500).json({
        error: "Echec lors de la recherche de l'utilisateur",
      })
    );
};

exports.deleteUser = (req, res) => {
  models.User.findOne({
    where: { id: req.params.id },
  })
    .then((userFound) => {
      if (userFound && (userFound.isAdmin || req.params.id == userFound.id)) {
        models.User.destroy(
          {
            where: {
              id: req.params.id,
            },
          }
        )
          .then(() =>
            res.status(202).json({
              message: "Utilisateur supprimé !",
            })
          )
          .catch(() =>
            res.status(500).json({
              error: "Echec lors de la suppression de l'utilisateur",
            })
          );
      } else {
        res.status(404).json({
          error: "l'utilisateur' n'a pas été trouvé",
        });
      }
    })
    .catch(() =>
      res.status(500).json({
        error: "Echec lors de la recherche de l'utilisateur",
      })
    );
};
