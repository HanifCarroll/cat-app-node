const Model = require("objection").Model;

class Cat extends Model {
  static get tableName() {
    return "cat";
  }

  static get relationMappings() {
    const User = require("./User");

    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "cat.ownerId",
          to: "user.id"
        }
      }
    };
  }
}

module.exports = Cat;
