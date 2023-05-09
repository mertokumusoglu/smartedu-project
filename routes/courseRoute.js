const express = require('express');
const courseController = require('../controllers/courseController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

router.route('/').get(courseController.getAllCourses);
router.route('/').post(roleMiddleware(["teacher", "administrator"]), courseController.courseCreate);
router.route('/:slug').get(courseController.getCourse);
router.route("/enroll").post(courseController.enrollCourse);
router.route("/release").post(courseController.releaseCourse);

module.exports = router;
