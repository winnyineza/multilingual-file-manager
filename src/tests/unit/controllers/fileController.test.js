const fileController = require('../../../controllers/fileController');
const FileService = require('../../../services/fileService');
const AppError = require('../../../utils/AppError');

jest.mock('../../../services/fileService');

describe('FileController', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      body: {},
      params: {},
      t: jest.fn(str => str)
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  describe('create', () => {
    it('should create a file successfully', async () => {
      const fileData = { name: 'test.txt' };
      mockReq.body = fileData;
      FileService.createFile.mockResolvedValue({ insertId: 1 });

      await fileController.create(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'file_created',
        id: 1
      });
    });
  });
}); 