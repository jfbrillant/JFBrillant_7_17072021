const bcrypt = require("bcrypt");
const models = require("../models");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  models.User.findOne({
    attributes: ['email'],
    where: { email: req.body.email }
  })
  .then((userFound) => {
    if (!userFound) {
      bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const newUser = models.User.create({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hash,
          isAdmin: 0
        });
        newUser
          .then(() => res.status(201).json({ 
            message: 'Utilisateur créé',
            id: newUser.id 
          }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
    } else {
      return res.status(409).json({ error: "L'utilisateur existe déjà" });
    }
  })
  .catch(() => res.status(500).json({ error: "Impossible de vérifier l'utilisateur" }));
};

exports.login = (req, res, next) => {
  models.User.findOne({
    where: { email: req.body.email }
  })
    .then((userFound) => {
      if (userFound) {
        bcrypt
        .compare(req.body.password, userFound.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: userFound.id,
            isAdmin: userFound.isAdmin,
            token: jwt.sign({ userId: userFound._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch(() => res.status(500).json({ error: "Echec de l'authentification" }));
      } else {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
    })
    .catch(() => res.status(500).json({ error: "Impossible de vérifier l'utilisateur" }));
};
