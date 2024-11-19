const request = require('supertest');
const app = require('../src/app');

describe('User API', () => {
  it('should register a user', async () => {
    const response = await request(app).post('/api/users/register').send({
      username: 'testuser',
      password: 'password123',
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('User registered successfully.');
  });

  it('should login a user', async () => {
    const response = await request(app).post('/api/users/login').send({
      username: 'testuser',
      password: 'password123',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});