import { downloadFile } from './download-file.function';

describe('download-file.function.ts', () => {
  const originalCreateObjectURL: (obj: Blob | MediaSource) => string = URL.createObjectURL;
  const originalRevokeObjectURL: (url: string) => void = URL.revokeObjectURL;
  let anchorClickSpy: jest.SpyInstance;

  beforeEach(() => {
    URL.createObjectURL = jest.fn(() => 'blob:http://localhost/sample');
    URL.revokeObjectURL = jest.fn();

    anchorClickSpy = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation();

    document.body.innerHTML = '';
  });

  afterEach(() => {
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;
    anchorClickSpy.mockRestore();
  });

  it('should create an anchor element and trigger download using a presigned URL', () => {
    const presignedUrl: string = 'https://example.com/path/to/file';

    downloadFile(presignedUrl);

    const anchor: HTMLAnchorElement | null = document.querySelector('a');
    expect(anchor).toBeNull();
    expect(anchorClickSpy).toHaveBeenCalledTimes(1);
  });

  it('should create an anchor element and download a file from a Blob', () => {
    const filename: string = 'example.txt';
    const blobData: Blob = new Blob(['Hello, world!'], { type: 'text/plain' });

    downloadFile(filename, blobData);

    const anchor: HTMLAnchorElement | null = document.querySelector('a');
    expect(anchor).toBeNull();
    expect(URL.createObjectURL).toHaveBeenCalledWith(blobData);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:http://localhost/sample');
    expect(anchorClickSpy).toHaveBeenCalledTimes(1);
  });

  it('should create an anchor element and download a file from a string', () => {
    const filename: string = 'example.txt';
    const stringData: string = 'Sample data content';

    downloadFile(filename, stringData);

    const anchor: HTMLAnchorElement | null = document.querySelector('a');
    expect(anchor).toBeNull();
    expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:http://localhost/sample');
    expect(anchorClickSpy).toHaveBeenCalledTimes(1);
  });

  it('should create an anchor element and download a file from a BlobPart (typed array)', () => {
    const filename: string = 'example.bin';
    const typedArray: Uint8Array = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" in ASCII

    downloadFile(filename, typedArray);

    const anchor: HTMLAnchorElement | null = document.querySelector('a');
    expect(anchor).toBeNull();
    const expectedBlob: Blob = new Blob([typedArray]);
    expect(URL.createObjectURL).toHaveBeenCalledWith(expectedBlob);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:http://localhost/sample');
    expect(anchorClickSpy).toHaveBeenCalledTimes(1);
  });
});
