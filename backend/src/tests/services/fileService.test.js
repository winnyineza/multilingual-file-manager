const fileService = require("../../services/fileService");
const redis = require("../../config/redis");
const File = require("../../models/file");

jest.mock("../../config/redis");
jest.mock("../../models/file");

describe("FileService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("uploadFile", () => {
    it("should queue file for upload", async () => {
      const mockFile = { filename: "test.txt" };
      const mockUserId = 1;

      await fileService.uploadFile(mockFile, mockUserId);

      expect(redis.lpush).toHaveBeenCalledWith(
        "upload_queue",
        expect.any(String)
      );
    });
  });

  describe("getUserFiles", () => {
    it("should return user files", async () => {
      const mockFiles = [{ id: 1, name: "test.txt" }];
      File.findByUserId.mockResolvedValue(mockFiles);

      const result = await fileService.getUserFiles(1);
      expect(result).toEqual(mockFiles);
    });
  });
});
