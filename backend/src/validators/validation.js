const { body } = require("express-validator");

const validateUser = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 31 })
    .withMessage("Name length must be 3-31 characters long"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password length must be min 6 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?8])[A-Za-z\d@$!%*?8]+$/
    )
    .withMessage(
      "Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
];

module.exports = {
  validateUser,
};
