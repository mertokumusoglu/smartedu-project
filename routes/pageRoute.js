const express = require("express");
const pageController = require("../controllers/pageController");

const router = express.Router();

router.get("/", pageController.getIndexPage)
router.get("/about", pageController.getAboutPage)
router.get("/courses", pageController.getCoursesPage)
router.get("/dashboard", pageController.getDashboardPage)
router.get("/contact", pageController.getContactPage)
router.get("/login", pageController.getLoginPage)
router.get("/register", pageController.getRegisterPage)

module.exports = router