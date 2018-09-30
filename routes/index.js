const express = require("express");
const router = express.Router();

const catRoutes = require("./catRoutes");
const userRoutes = require("./userRoutes");

router.get("/", (req, res) => res.send({ hey: "hi" }));
router.use("/cats", catRoutes);
router.use("/users", userRoutes);

module.exports = router;
