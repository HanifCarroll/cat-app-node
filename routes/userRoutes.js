const { transaction } = require("objection");
const userRoutes = require("express").Router();
const User = require("../models/User");

module.exports = (() => {
  userRoutes.get("/", async (req, res) => {
    const users = await User.query();

    res.send(users);
  });

  userRoutes.post("/", async (req, res) => {
    const user = req.body;

    const insertedUser = await transaction(User.knex(), trx => {
      return User.query(trx).insert(user);
    });

    res.send(insertedUser);
  });

  userRoutes.get("/:id", async (req, res) => {
    const user = await User.query().findOne({ id: req.params.id });

    res.send(user);
  });

  userRoutes.delete("/:id", async (req, res) => {
    const deletedUser = await User.query().deleteById(req.params.id);

    res.send("User deleted");
  });

  userRoutes.patch("/:id", async (req, res) => {
    const updatedUser = await User.query().patchAndFetchById(req.params.id, {
      ...req.body
    });

    res.send(updatedUser);
  });

  return userRoutes;
})();
