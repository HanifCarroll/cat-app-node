const express = require("express");
const app = express();
const port = 5000;

// Set up DB and ORM
require("./sequelize");

app.use(express.urlencoded({ extended: true }));

// Include routes
app.use(require("./routes"));

// Start the app
app.listen(port, () => console.log("App started!"));
