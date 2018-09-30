const Model = require("objection").Model;

class User extends Model {
  static get tableName() {
    return "user";
  }

  static get relationMappings() {
    const Cat = require("./Cat");

    return {
      cat: {
        relation: Model.HasManyRelation,
        modelClass: Cat,
        join: {
          from: "user.id",
          to: "cat.ownerId"
        }
      }
    };
  }
}

module.exports = User;
