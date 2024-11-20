const request = require("supertest");
const app = require("../app");
const fileService = require("../services/fileService");

describe("File Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/files", () => {
    it("should return user files when authenticated", async () => {
      const mockFiles = [{ id: 1, name: "test.txt" }];
      jest.spyOn(fileService, "getUserFiles").mockResolvedValue(mockFiles);

      const response = await request(app)
        .get("/api/files")
        .set("Authorization", "Bearer test-token");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockFiles);
    });
  });
});
