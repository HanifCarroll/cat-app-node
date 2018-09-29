const { transaction } = require("objection");
const catRoutes = require("express").Router();
const Cat = require("../models/Cat");

module.exports = (() => {
  catRoutes.get("/", async (req, res) => {
    const cats = await Cat.query();

    res.send(cats);
  });

  catRoutes.post("/", async (req, res) => {
    const cat = req.body;

    const insertedCat = await transaction(Cat.knex(), trx => {
      return Cat.query(trx).insert(cat);
    });

    res.send(insertedCat);
  });

  catRoutes.get("/:id", async (req, res) => {
    const cat = await Cat.query().findOne({ id: req.params.id });

    res.send(cat);
  });

  catRoutes.delete("/:id", async (req, res) => {
    const deletedCat = await Cat.query().deleteById(req.params.id);

    res.send("Cat deleted");
  });

  catRoutes.patch("/:id", async (req, res) => {
    const updatedCat = await Cat.query().patchAndFetchById(req.params.id, {
      ...req.body
    });

    res.send(updatedCat);
  });

  return catRoutes;
})();
