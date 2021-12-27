import { blobToFile, isEqual } from '@workspaces/common';
import { blobMock, jsonMock } from '@workspaces/internal';
import { getFileContent } from './get-file-content.function';

describe('get-file-content.function.ts', () => {
  const sampleFile: File = blobToFile(blobMock, 'test.json');

  it('should return data as instance of String object', () => {
    getFileContent(sampleFile).subscribe((fileData: unknown) => {
      expect(fileData instanceof String).toBe(true);
    });
  });

  it('should return data as correct string', () => {
    getFileContent(sampleFile).subscribe((fileData: unknown) => {
      expect(isEqual(fileData, jsonMock)).toBe(true);
    });
  });
});
