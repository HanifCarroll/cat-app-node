const catRoutes = require("express").Router();
const { Cat, User, Rating } = require("../sequelize");

module.exports = (() => {
  catRoutes.get("/", async (req, res) => {
    const cats = await Cat.scope("withUserAndRatings").findAll();

    return res.send(cats);
  });

  catRoutes.post("/", async (req, res) => {
    const insertedCat = await Cat.create(req.body);

    return res.send(insertedCat);
  });

  catRoutes.get("/:id", async (req, res) => {
    const cat = await Cat.scope("withUserAndRatings").findById(req.params.id);

    return cat ? res.send(cat) : res.send("Cat not found.");
  });

  catRoutes.delete("/:id", async (req, res) => {
    const status = await Cat.destroy({ where: { id: req.params.id } });

    return status === 1 ? res.send("Cat deleted") : res.send("Cat not found.");
  });

  catRoutes.patch("/:id", async (req, res) => {
    const cat = await Cat.findById(req.params.id);

    if (!cat) return res.send("Cat not found");

    const updatedCat = await cat.update(req.body);

    return res.send(updatedCat);
  });

  catRoutes.post("/:id/rating", async (req, res) => {
    const { catId, userId } = req.body;
    const cat = await Cat.findById(req.params.id);

    if (!cat) return res.send("Cat not found");

    // const rating = await Rating.create(req.body);
    // res.send(rating);
    Rating.create(req.body)
      .then(rating => res.send(rating))
      .catch(e => res.send(e));
  });

  return catRoutes;
})();
