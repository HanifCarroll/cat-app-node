const Sequelize = require("sequelize");
const UserModel = require("./models/User");
const CatModel = require("./models/Cat");
const RatingModel = require("./models/Rating");

const sequelize = new Sequelize("cat_app", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: Sequelize.Op,
  logging: false
});

const User = UserModel(sequelize, Sequelize);
const Cat = CatModel(sequelize, Sequelize);
const Rating = RatingModel(sequelize, Sequelize);

User.hasMany(Cat, { as: "cats" });
Cat.belongsTo(User);
Rating.belongsTo(Cat);
Rating.belongsTo(User);
Cat.hasMany(Rating, { as: "ratings" });
User.hasMany(Rating, { as: "ratings" });

User.addScope(
  "withCatsAndRatings",
  {
    include: [
      {
        model: Cat,
        as: "cats"
      },
      { model: Rating, as: "ratings" }
    ]
  },
  { override: true }
);

Cat.addScope(
  "withUserAndRatings",
  {
    include: [
      { model: User },
      {
        model: Rating,
        as: "ratings",
        attributes: [
          [sequelize.fn("AVG", sequelize.col("ratings.value")), "avgValue"]
        ]
      }
    ],
    attributes: { exclude: ["userId"] }
  },
  {
    override: true
  }
);
sequelize.sync().then(() => {
  console.log(`Database & tables created!`);
});

module.exports = {
  User,
  Cat,
  Rating,
  sequelize
};
