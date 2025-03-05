const { body } = require("express-validator");

const validateUser = [
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("isAdmin").notEmpty().withMessage("isAdmin is required"),
];

module.exports = {
    validateUser
}