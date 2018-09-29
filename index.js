const express = require("express");
const app = express();
const port = 5000;
const { Model } = require("objection");
const Knex = require("knex");

app.use(express.urlencoded({ extended: true }));

// Knex and Objection config
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig);
Model.knex(knex);

// Include routes
app.use(require("./routes"));

app.listen(port, () => console.log("App started!"));
