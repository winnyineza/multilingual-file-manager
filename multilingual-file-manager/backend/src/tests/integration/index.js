// Export shared test utilities for integration tests
export const setupTestDb = async () => {
  await db.migrate.latest();
};

export const teardownTestDb = async () => {
  await db.migrate.rollback();
}; 