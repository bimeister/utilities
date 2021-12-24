import { isNil } from 'packages/common';
import { fromEvent, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

interface FileOpenOptions {
  accept?: string[];
  multiple?: boolean;
}

/**
 * @description Opens file-picker to get file from computer
 * @deprecated Should be common (without rxjs)
 */
export function getFileFromPicker(options?: FileOpenOptions): Observable<FileList | null> {
  const inputFileElement: HTMLInputElement = document.createElement('input');
  inputFileElement.type = 'file';

  if (acceptOptionIsDefined(options)) {
    inputFileElement.accept = options.accept.join(',');
  }

  if (multipleOptionIsDefined(options)) {
    inputFileElement.multiple = options.multiple;
  }

  inputFileElement.click();

  return fromEvent(inputFileElement, 'change').pipe(
    map(() => inputFileElement.files),
    take(1),
    tap(() => document.removeChild(inputFileElement))
  );
}

function acceptOptionIsDefined(
  options: FileOpenOptions | undefined
): options is FileOpenOptions & { accept: string[] } {
  return !isNil(options) && Array.isArray(options.accept);
}

function multipleOptionIsDefined(
  options: FileOpenOptions | undefined
): options is FileOpenOptions & { multiple: boolean } {
  return !isNil(options) && typeof options.multiple === 'boolean';
}
