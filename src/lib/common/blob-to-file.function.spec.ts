import { blobMock } from './../../internal/mocks/blob.mock';
import { nameMock } from './../../internal/mocks/name.mock';
import { blobToFile } from './blob-to-file.function';

describe('blob-to-file.function.ts', () => {
  const sampleBlob: Blob = blobMock;
  const sampleFileName: string = nameMock;

  it('should return file as instance of File or Blob object', () => {
    const resultFile: unknown = blobToFile(sampleBlob, sampleFileName);
    expect(resultFile instanceof Blob || resultFile instanceof File).toBe(true);
  });

  it('should return file with required File properties', () => {
    const resultFile: unknown = blobToFile(sampleBlob, sampleFileName);
    const resultFileProps: string[] = Object.getOwnPropertyNames(resultFile);
    expect(resultFileProps.includes('name') && resultFileProps.includes('lastModifiedDate')).toBe(true);
  });

  it('should return file with requested name', () => {
    const resultFile: unknown = blobToFile(sampleBlob, sampleFileName);
    const resultFileName: string = Object.getOwnPropertyDescriptor(resultFile, 'name').value;
    expect(resultFileName).toBe(sampleFileName);
  });
});
