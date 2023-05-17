const express = require("express");
const authController = require("../controllers/authController");
const { body } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

router.route('/signup').post(
  [
    body('name', 'Name must be not empty').trim().isLength({ min: 1 }).escape(),
    body('email')
      .isEmail()
      .withMessage('Please enter valid email')
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        });
      }),
    body('password', 'Please enter a password')
      .trim()
      .isLength({ min: 1 })
      .escape(),
  ],
  authController.createUser
);
router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logoutUser);
router.route("/:id").delete(authController.deleteUser);
module.exports = router