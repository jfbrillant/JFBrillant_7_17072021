const { check, validationResult } = require("express-validator");

const signUpValidationRules = () => {
  return [
    check("firstname")
      .exists()
      .withMessage("Le prénom est requis")
      .isLength({ min: 2 })
      .withMessage("Le prénom doit contenir 2 caractères au minimum"),
    check("lastname")
      .exists()
      .withMessage("Le nom est requis")
      .isLength({ min: 2 })
      .withMessage("Le nom doit contenir 2 caractères au minimum"),
    check("email")
      .exists()
      .withMessage("L'email est requis")
      .isEmail()
      .normalizeEmail()
      .withMessage("Le format de l'email n'est pas valide"),
    check("password")
      .exists()
      .withMessage("Le mot de passe est requis")
      .isLength({ min: 8 })
      .withMessage("Le mot de passe doit contenir 8 caractères au minimum"),
  ];
};

const loginValidationRules = () => {
  return [
    check("email")
      .exists()
      .withMessage("L'email est requis")
      .isEmail()
      .normalizeEmail()
      .withMessage("Le format de l'email n'est pas valide"),
    check("password")
      .exists()
      .withMessage("Le mot de passe est requis")
      .isLength({ min: 8 })
      .withMessage("Le mot de passe doit contenir 8 caractères au minimum"),
  ];
};

const postValidationRules = () => {
  return [
    check("title")
    .exists()
    .withMessage("Le titre est requis")
    .isLength({ min: 2 })
    .withMessage("Le titre doit contenir 2 caractères au minimum"),
  ];
};

const commentValidationRules = () => {
  return [
    check("content")
    .exists()
    .withMessage("Le commentaire ne peut être vide")
    .isLength({ min: 2 })
    .withMessage("Le commentaire doit contenir 2 caractères au minimum"),
  ];
};

const userValidationRules = () => {
  return [
    check("firstname")
      .exists()
      .withMessage("Le prénom est requis")
      .isLength({ min: 2 })
      .withMessage("Le prénom doit contenir 2 caractères au minimum"),
    check("lastname")
      .exists()
      .withMessage("Le nom est requis")
      .isLength({ min: 2 })
      .withMessage("Le nom doit contenir 2 caractères au minimum"),
  ];
};



const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  signUpValidationRules,
  loginValidationRules,
  postValidationRules,
  commentValidationRules,
  userValidationRules,
  validate,
};
