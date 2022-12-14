import { blobMock, nameMock } from '@bimeister/utilities.internal';
import { blobToFile } from './blob-to-file.function';

describe('blob-to-file.function.ts', () => {
  const sampleBlob: Blob = blobMock;
  const sampleFileName: string = nameMock;

  it('should return file as instance of Blob object', () => {
    const resultFile: File = blobToFile(sampleBlob, sampleFileName);
    expect(resultFile instanceof Blob).toBe(true);
  });

  it('should return file as instance of File object', () => {
    const resultFile: File = blobToFile(sampleBlob, sampleFileName);
    expect(resultFile instanceof File).toBe(true);
  });

  it('should return file with requested type', () => {
    const resultFile: File = blobToFile(sampleBlob, sampleFileName);
    const resultFileType: string = resultFile['type'];
    expect(resultFileType).toBe(sampleBlob.type);
  });

  it('should return file with requested name', () => {
    const resultFile: File = blobToFile(sampleBlob, sampleFileName);
    const resultFileName: string = resultFile['name'];
    expect(resultFileName).toBe(sampleFileName);
  });
});
