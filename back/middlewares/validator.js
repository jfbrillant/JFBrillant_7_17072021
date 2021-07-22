const { check, validationResult } = require("express-validator");

const signUpValidationRules = () => {
  return [
    check(
      "firstname",
      "Le prénom doit contenir au moins 2 caractères et uniquement des lettres"
    )
      .isAlpha()
      .isLength({ min: 2 }),
      check(
        "lastname",
        "Le nom doit contenir au moins 3 caractères et uniquement des lettres"
      )
        .isAlpha()
        .isLength({ min: 3 }),
    check("email", "L'email n'est pas valide").isEmail().normalizeEmail(),
    check(
      "password",
      "Le mot de passe doit contenir au moins 8 caractères et uniquement des chiffres et des lettres"
    )
      .isAlphanumeric()
      .isLength({ min: 8 }),
  ];
};

const loginValidationRules = () => {
  return [
    check("email", "L'email n'est pas valide").isEmail().normalizeEmail(),
    check(
      "password",
      "Le mot de passe doit contenir au moins 8 caractères et uniquement des chiffres et des lettres"
    )
      .isAlphanumeric()
      .isLength({ min: 8 }),
  ];
};

const submitPostValidationRules = () => {
  return [
    check("title", "Le titre n'est pas valide")
    .isAlphanumeric()
    .isLength({ min: 2 }),
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
  submitPostValidationRules,
  validate,
};
