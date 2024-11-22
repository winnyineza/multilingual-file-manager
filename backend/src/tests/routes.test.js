const request = require('supertest');
const app = require('../app');

describe('API Routes', () => {
  describe('GET /api/health', () => {
    it('should return 200 OK with status message', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        status: 'ok'
      });
    });
  });
});