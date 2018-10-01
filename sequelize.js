const Sequelize = require("sequelize");
const UserModel = require("./models/User");
const CatModel = require("./models/Cat");

const sequelize = new Sequelize("cat_app", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: Sequelize.Op,
  logging: false
});

const User = UserModel(sequelize, Sequelize);
const Cat = CatModel(sequelize, Sequelize);

User.hasMany(Cat, { as: "Cats" });
Cat.belongsTo(User);

sequelize.sync().then(() => {
  console.log(`Database & tables created!`);
});

module.exports = {
  User,
  Cat,
  sequelize
};
