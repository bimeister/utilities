import { blobMock, nameMock } from '@bimeister/utilities.internal';
import { downloadFile } from './download-file.function';

describe('download-file.function.ts', () => {
  const fileNameSample: string = nameMock;
  const fileSample: Blob = blobMock;

  document.body.innerHTML = ``;
  window.URL.createObjectURL = (): string => nameMock;

  it('should create new DOM-element', () => {
    downloadFile(fileNameSample, fileSample);
    const aElement: HTMLAnchorElement | null = document.querySelector('a');
    expect(aElement).toBeDefined();
  });
});
