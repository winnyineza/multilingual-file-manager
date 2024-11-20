exports.up = function(knex) {
  return knex.schema.createTable('files', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('path').notNullable();
    table.integer('user_id').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('files');
}; 