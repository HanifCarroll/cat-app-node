exports.up = function(knex, Promise) {
  knex.schema.table("user", t => {
    t.specificType("cat", "json[]");
  });

  knex.schema.table("cat", t => {});
};

exports.down = function(knex, Promise) {
  knex.schema.table("user", t => {
    t.increments("id").primary();
    t.string("username").notNullable();
    t.string("password").notNullable();
    t.timestamps(false, true);
  });

  knex.schema.table("cat", t => {
    t.increments("id").primary();
    t.string("name", 30).notNullable();
    t.string("description").notNullable();
    t.timestamps(false, true);
  });
};
