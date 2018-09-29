exports.up = function(knex, Promise) {
  return knex.schema.createTable("cat", t => {
    t.increments("id").primary();
    t.string("name", 30).notNullable();
    t.string("description").notNullable();
    t.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cat");
};
