import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface FileOpenOptions {
  accept?: string[];
  multiple?: boolean;
}

/**
 * Opens file-picker to get file from computer
 */
export function readLocalFile(options?: FileOpenOptions): Observable<FileList> {
  const inputFileElement: HTMLInputElement = document.createElement('input');
  inputFileElement.type = 'file';
  inputFileElement.accept = options?.accept.join(',');
  inputFileElement.multiple = options?.multiple;
  inputFileElement.click();

  return fromEvent(inputFileElement, 'change').pipe(map(() => inputFileElement.files));
}
