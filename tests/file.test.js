const request = require('supertest');
const app = require('../src/app');

describe('File API', () => {
  it('should create a file', async () => {
    const response = await request(app).post('/api/files').send({
      name: 'testfile.txt',
      path: '/uploads/testfile.txt',
      user_id: 1,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('File created successfully.');
  });
});
