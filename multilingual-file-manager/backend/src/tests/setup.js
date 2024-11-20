require('dotenv').config();
const db = require('../config/db');

// Global test setup
beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  await db.migrate.latest();
});

// Global test teardown
afterAll(async () => {
  await db.migrate.rollback();
  await db.destroy();
}); 