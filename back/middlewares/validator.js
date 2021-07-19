const { check, validationResult } = require("express-validator");

const signUpValidationRules = () => {
  return [
    check(
      "firstname",
      "Le prénom doit contenir au moins 3 caractères et uniquement des lettres"
    )
      .isAlpha()
      .isLength({ min: 3 }),
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

const validate = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  signUpValidationRules,
  loginValidationRules,
  validate,
};
