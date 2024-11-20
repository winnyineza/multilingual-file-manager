const FileService = require('../../../services/fileService');
const File = require('../../../models/fileModel');
const fileQueue = require('../../../queues');
const AppError = require('../../../utils/AppError');

jest.mock('../../../models/fileModel');
jest.mock('../../../queues');

describe('FileService', () => {
  describe('createFile', () => {
    it('should create a file and queue processing', async () => {
      const fileData = { name: 'test.txt' };
      const mockResult = { insertId: 1 };
      
      File.create.mockResolvedValue(mockResult);
      fileQueue.add.mockResolvedValue();

      const result = await FileService.createFile(fileData);

      expect(result).toEqual(mockResult);
      expect(fileQueue.add).toHaveBeenCalledWith(
        'processFile',
        { fileId: mockResult.insertId }
      );
    });
  });
}); 