const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute")

mongoose.connect('mongodb://127.0.0.1:27017/smartedu-db');

// template engine
app.set('view engine', 'ejs');

// global variable
global.userIN = null;


// middlewares
app.use(express.static('public'));
app.use(express.json()); // for parsin application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/smartedu-db' })
}));

app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});

// routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use("/category", categoryRoute)
app.use("/users", userRoute)

const port = 3000;
app.listen(port, () => {
  console.log(`Server is working on port ${port}`);
});
