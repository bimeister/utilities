import { blobMock, jsonMock, nameMock } from '@bimeister/utilities.internal';
import { downloadFile } from './download-file.function';

describe('download-file.function.ts', () => {
  const fileNameSample: string = nameMock;

  document.body.innerHTML = ``;
  window.URL.createObjectURL = (): string => nameMock;

  it('should create new DOM-element if data is Blob', () => {
    const fileSample: Blob = blobMock;
    downloadFile(fileNameSample, fileSample);
    const aElement: HTMLAnchorElement | null = document.querySelector('a');
    expect(aElement).toBeDefined();
  });

  it('should create new DOM-element if data is string', () => {
    const fileSample: string = jsonMock;
    downloadFile(fileNameSample, fileSample);
    const aElement: HTMLAnchorElement | null = document.querySelector('a');
    expect(aElement).toBeDefined();
  });
});
