module.exports = (sequelize, type) => {
  return sequelize.define("rating", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    value: {
      type: type.INTEGER,
      validate: { min: 1, max: 5 }
    }
  });
};
