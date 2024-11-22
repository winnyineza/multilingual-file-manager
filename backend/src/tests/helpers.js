const jwt = require('jsonwebtoken');

const redisMock = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn()
};

const createTestUser = () => ({
  id: 1,
  username: 'testuser',
  email: 'test@example.com'
});

const generateToken = (user) => {
  return 'test-token';
};

module.exports = {
  redisMock,
  createTestUser,
  generateToken
};