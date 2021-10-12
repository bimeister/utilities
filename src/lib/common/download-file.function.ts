export function downloadFile(filename: string, data: Blob | string): void {
  const dataBlob: Blob = data instanceof Blob ? data : new Blob([data]);

  const anchor: HTMLAnchorElement = document.createElement('a');
  anchor.href = URL.createObjectURL(dataBlob);
  anchor.download = filename;
  anchor.click();
}
