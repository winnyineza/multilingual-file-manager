exports.up = function(knex) {
  return knex.schema.createTable('file_versions', table => {
    table.increments('id').primary();
    table.integer('file_id').unsigned().references('id').inTable('files');
    table.string('path').notNullable();
    table.string('version_number').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('file_versions');
}; 