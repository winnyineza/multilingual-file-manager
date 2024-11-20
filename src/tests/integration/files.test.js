const request = require('supertest');
const app = require('../../app');
const db = require('../../config/db');
const { createTestUser, generateToken } = require('../helpers');

describe('Files API Integration', () => {
  let token;
  let userId;

  beforeAll(async () => {
    await db.migrate.latest();
    const user = await createTestUser();
    userId = user.id;
    token = generateToken(user);
  });

  afterAll(async () => {
    await db.migrate.rollback();
  });

  describe('POST /api/files', () => {
    it('should create a file when authenticated', async () => {
      const response = await request(app)
        .post('/api/files')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'test.txt',
          path: '/uploads/test.txt',
          user_id: userId
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .post('/api/files')
        .send({
          name: 'test.txt',
          path: '/uploads/test.txt',
          user_id: userId
        });

      expect(response.status).toBe(401);
    });
  });
}); 