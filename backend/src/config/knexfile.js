require('dotenv').config({ path: '../../.env' });

module.exports = {
  development: {
    // ... config
    migrations: {
      directory: '../migrations'
    },
    seeds: {
      directory: '../seeds'
    }
  },
  test: {
    // ... config
    migrations: {
      directory: '../migrations'
    }
  }
}; 