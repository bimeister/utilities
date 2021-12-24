import { fromEvent, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

/**
 * @deprecated Should be common (without rxjs)
 */
export const getFileContent = (file: File): Observable<string> => {
  const fileReader: FileReader = new FileReader();
  const fileData$: Observable<string> = fromEvent(fileReader, 'loadend').pipe(
    map(() => (typeof fileReader.result === 'string' ? fileReader.result : '')),
    take(1)
  );

  fileReader.readAsText(file);

  return fileData$;
};
