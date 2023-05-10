const User = require("../models/User")
const Category = require("../models/Category")
const Course = require("../models/Course")
const nodemailer = require("nodemailer")

exports.getIndexPage = (req, res) => {
  console.log(req.session.userID)
  res.status(200).render('index', {
    page_name: 'index',
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getCoursesPage = (req, res) => {
  res.status(200).render('courses', {
    page_name: 'courses',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({_id: req.session.userID}).populate("courses");
  const categories = await Category.find();
  const courses = await Course.find({user: req.session.userID});
  res.status(200).render("dashboard",{
  page_name: "dashboard",
  user,
  courses,
  categories});
}

exports.sendEmail = async (req, res) => {
  try {
  const outputMessage = `
  <h1> Mail details </h1>
  <ul>
    <li> Name: ${req.body.name}  </li>
    <li> Email: ${req.body.email} </li>
  </ul>
  <h1> Message </h1>
  <p> ${req.body.message} </p>
  `
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: '',
        pass: ''
    }
});
  let message = await transporter.sendMail({
    from: "",
    to: "",
    subject: "SmartEdu Email Subject",
    html: outputMessage
  });
  console.log("Message sent: %s", message.messageId);
  
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));

  req.flash("success", "We Received your message succesfully");

  res.status(200).redirect('contact');

} catch (error) {
  req.flash("error", "Something happened!");

  res.status(400).redirect("contact")
  }
} 