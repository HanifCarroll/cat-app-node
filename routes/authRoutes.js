const authRoutes = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { jwtSecret } = require("../config/keys");
const { User } = require("../sequelize");

module.exports = (() => {
  authRoutes.post("/register", async (req, res) => {
    let { name, password } = req.body;

    password = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      name,
      password
    });

    // Send token
    const payload = { id: user.id, email: user.name };
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: 3600
    });

    res.cookie("jwt", token).send(user);
  });

  authRoutes.post("/login", async (req, res) => {
    const { name, password } = req.body;
    const failMessage = { error: "Incorrect credentials." };

    // Check to see if the user exists.
    const user = await User.find({ where: { name } });
    if (!user) return res.status(400).send(failMessage);

    // Check to see if the passwords match.
    const verified = await bcrypt.compare(password, user.password);
    if (!verified) return res.status(400).send(failMessage);

    // Send token
    const payload = { id: user.id, email: user.name };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: 3600 });

    res
      .cookie("jwt", token)
      .status(200)
      .send(user);
  });

  return authRoutes;
})();
