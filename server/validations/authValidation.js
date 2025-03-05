const { body } = require("express-validator");

const loginValidation = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
]

module.exports = {
    loginValidation
}