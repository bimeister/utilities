/* eslint-disable @typescript-eslint/unified-signatures */
import { isNil } from './is-nil.function';

/**
 * Initiates a file download using a pre-signed URL.
 *
 * @param presignedUrl - The pre-signed URL from which the file will be downloaded.
 *
 * @example
 * Download a file from a pre-signed URL:
 * downloadFile('https://example.com/path/to/file');
 */
export function downloadFile(presignedUrl: string): void;

/**
 * Creates and downloads a file from the provided data.
 *
 * @param filename - The name under which the file will be saved.
 * @param data - The data to be downloaded, provided as BlobPart.
 *
 * @example
 * Download a file from Blob data:
 * const data = new Blob(['Hello, world!'], { type: 'text/plain' });
 * downloadFile('example.txt', data);
 *
 * @example
 * Download a file from string data:
 * const dataString = "Sample data content";
 * downloadFile('example.txt', dataString);
 */
export function downloadFile(filename: string, data: BlobPart): void;

export function downloadFile(filenameOrPresignedUrl: string, data?: BlobPart): void {
  if (isNil(data)) {
    const anchor: HTMLAnchorElement = document.createElement('a');
    anchor.href = filenameOrPresignedUrl;
    anchor.click();
    anchor.remove();
    return;
  }

  const dataBlob: Blob = data instanceof Blob ? data : new Blob([data]);
  const anchor: HTMLAnchorElement = document.createElement('a');
  anchor.href = URL.createObjectURL(dataBlob);
  anchor.download = filenameOrPresignedUrl;
  anchor.click();
  URL.revokeObjectURL(anchor.href);
  anchor.remove();
}
