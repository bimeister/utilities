import { blobMock } from '@bimeister/utilities.internal';
import { blobToFile } from './blob-to-file.function';
import { fileListToArray } from './file-list-to-array.function';

describe('file-list-to-array.function.ts', () => {
  it('should return empty array if file list is empty', () => {
    const fileListMock: FileList = {
      length: 0,
      item(_: number): File | null {
        return null;
      }
    } as any;

    expect(fileListToArray(fileListMock)).toBeInstanceOf(Array);
    expect(fileListToArray(fileListMock)).toHaveLength(0);
  });

  it('should return array with files from file list', () => {
    const fileMock: File = blobToFile(blobMock, 'fileMock');

    const fileListMock: FileList = {
      length: 1,
      item(index: number): File | null {
        return Object.is(index, 0) ? fileMock : null;
      }
    } as any;

    expect(fileListToArray(fileListMock)).toBeInstanceOf(Array);
    expect(fileListToArray(fileListMock)).toHaveLength(1);
    expect(fileListToArray(fileListMock)[0]).toBeDefined();
    expect(fileListToArray(fileListMock)[0]).toBe(fileMock);
  });
});
