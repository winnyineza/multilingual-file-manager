module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '**/src/tests/routes.test.js',
    '**/src/tests/unit/services/fileService.test.js'
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  verbose: true,
  modulePathIgnorePatterns: [
    'node_modules'
  ]
};