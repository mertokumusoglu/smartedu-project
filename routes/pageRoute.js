const express = require("express");
const pageController = require("../controllers/pageController");
const authMiddleware = require("../middlewares/authMiddleware");
const redirectMiddleware = require("../middlewares/redirectMiddleware");

const router = express.Router();

router.get("/", pageController.getIndexPage)
router.get("/about", pageController.getAboutPage)
router.get("/contact", pageController.getContactPage)
router.route("/login").get(redirectMiddleware, pageController.getLoginPage)
router.route("/register").get(redirectMiddleware, pageController.getRegisterPage)
router.route("/users/dashboard").get(authMiddleware, pageController.getDashboardPage)
router.route("/contact").post(pageController.sendEmail)

module.exports = router