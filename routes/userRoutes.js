const userRoutes = require("express").Router();
const { Cat, User } = require("../sequelize");

module.exports = (() => {
  userRoutes.get("/", async (req, res) => {
    const users = await User.findAll({
      include: [{ model: Cat, as: "Cats" }]
    });

    res.send(users);
  });

  userRoutes.post("/", async (req, res) => {
    const insertedUser = await User.create(req.body);

    res.send(insertedUser);
  });

  userRoutes.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id, {
      include: [{ model: Cat, as: "Cats", attributes: { exclude: ["userId"] } }]
    });

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
