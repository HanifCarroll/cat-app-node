const express = require("express");
const app = express();
const passport = require("passport");
const cookieParser = require("cookie-parser");
const port = 5000;

// Set up DB and ORM
require("./sequelize");

// Set up passport for JWT authentication
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Body and cookie parsers
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Include routes
app.use(require("./routes"));

// Start the app
app.listen(port, () => console.log("App started!"));
