import { blobMock } from './../../internal/mocks/blob.mock';
import { nameMock } from './../../internal/mocks/name.mock';
import { downloadFile } from './download-file.function';

describe('download-file.function.ts', () => {
  const fileNameSample: string = nameMock;
  const fileSample: Blob = blobMock;

  document.body.innerHTML = ``;
  window.URL.createObjectURL = (): string => {
    return nameMock;
  };

  it('should create new DOM-element', () => {
    downloadFile(fileNameSample, fileSample);
    const aElement: HTMLAnchorElement = document.querySelector('a');
    expect(aElement).toBeDefined();
  });
});
