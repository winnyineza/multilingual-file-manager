exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          username: 'admin',
          email: 'admin@example.com',
          password: '$2a$10$encrypted_password',
          role: 'admin'
        }
      ]);
    });
}; 