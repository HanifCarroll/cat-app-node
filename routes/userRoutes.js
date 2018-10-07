const userRoutes = require("express").Router();
const { Cat, User, Rating } = require("../sequelize");

module.exports = (() => {
  userRoutes.get("/", async (req, res) => {
    const users = await User.scope("withCatsAndRatings").findAll();

    res.send(users);
  });

  userRoutes.get("/:id", async (req, res) => {
    const user = await User.scope("withCatsAndRatings").findById(req.params.id);

    user ? res.send(user) : res.send("User not found.");
  });

  userRoutes.delete("/:id", async (req, res) => {
    const status = await User.destroy({ where: { id: req.params.id } });

    status === 1 ? res.send("User deleted") : res.send("User not found.");
  });

  userRoutes.patch("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) res.send("User not found");

    const updatedUser = await user.update(req.body);

    res.send(updatedUser);
  });

  return userRoutes;
})();
