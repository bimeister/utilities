import { blobMock } from './../../internal/mocks/blob.mock';
import { jsonMock } from './../../internal/mocks/json.mock';
import { blobToFile } from './blob-to-file.function';
import { fileToString } from './file-to-string.function';
import { isEqual } from './is-equal.function';

describe('file-to-string.function.ts', () => {
  const sampleFile: File = blobToFile(blobMock, 'test.json');

  it('should return data as instance of String object', () => {
    fileToString(sampleFile).subscribe((fileData: unknown) => {
      expect(fileData instanceof String).toBe(true);
    });
  });

  it('should return data as correct string', () => {
    fileToString(sampleFile).subscribe((fileData: unknown) => {
      expect(isEqual(fileData, jsonMock)).toBe(true);
    });
  });
});
