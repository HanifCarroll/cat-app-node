const express = require("express");
const router = express.Router();

const catRoutes = require("./catRoutes");

router.get("/", (req, res) => res.send({ hey: "hi" }));
router.use("/cats", catRoutes);

module.exports = router;
