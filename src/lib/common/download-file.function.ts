export function downloadFile(filename: string, blob: Blob): void {
  const anchor: HTMLAnchorElement = document.createElement('a');
  anchor.href = URL.createObjectURL(blob);
  anchor.download = filename;
  anchor.click();
}
