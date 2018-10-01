const catRoutes = require("express").Router();
const { Cat, User } = require("../sequelize");

module.exports = (() => {
  catRoutes.get("/", async (req, res) => {
    const cats = await Cat.findAll({
      include: [{ model: User }],
      attributes: { exclude: ["userId"] }
    });

    res.send(cats);
  });

  catRoutes.post("/", async (req, res) => {
    const insertedCat = await Cat.create(req.body);

    res.send(insertedCat);
  });

  catRoutes.get("/:id", async (req, res) => {
    const cat = await Cat.findById(req.params.id, {
      include: User,
      attributes: { exclude: ["userId"] }
    });

    cat ? res.send(cat) : res.send("Cat not found.");
  });

  catRoutes.delete("/:id", async (req, res) => {
    const status = await Cat.destroy({ where: { id: req.params.id } });

    status === 1 ? res.send("Cat deleted") : res.send("Cat not found.");
  });

  catRoutes.patch("/:id", async (req, res) => {
    const cat = await Cat.findById(req.params.id);

    if (!cat) res.send("User not found");

    const updatedCat = await cat.update(req.body);

    res.send(updatedCat);
  });

  return catRoutes;
})();
