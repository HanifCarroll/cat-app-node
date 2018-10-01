module.exports = (sequelize, type) => {
  return sequelize.define("cat", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    description: type.STRING
  });
};
