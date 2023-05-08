const express = require("express");
const pageController = require("../controllers/pageController");

const router = express.Router();

router.get("/", pageController.getIndexPage)
router.get("/about", pageController.getAboutPage)
router.get("/contact", pageController.getContactPage)
router.get("/login", pageController.getLoginPage)
router.get("/register", pageController.getRegisterPage)
router.route("/users/dashboard").get(pageController.getDashboardPage)

module.exports = router