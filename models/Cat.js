const Model = require("objection").Model;

class Cat extends Model {
  static get tableName() {
    return "cat";
  }
}

module.exports = Cat;
