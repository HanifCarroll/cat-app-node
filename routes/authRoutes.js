const authRoutes = require("express").Router();
const bcrypt = require("bcrypt");

const { User } = require("../sequelize");

module.exports = (() => {
  authRoutes.post("/register", async (req, res) => {
    let { name, password } = req.body;

    password = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({ name, password });

    res.status(200).send({ user });
  });

  authRoutes.post("/login", async (req, res) => {
    const { name, password } = req.body;
    const failMessage = { error: "Incorrect credentials." };

    const user = await User.find({ where: { name } });
    if (!user) return res.status(401).send(failMessage);

    const verified = await bcrypt.compare(password, user.password);
    if (!verified) return res.status(401).send(failMessage);

    res.status(200).send({ user });
  });

  return authRoutes;
})();
