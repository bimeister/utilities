import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export const tapLog = <T>(...prefixes: unknown[]): MonoTypeOperatorFunction<T> => (
  source$: Observable<T>
): Observable<T> => {
  return source$.pipe(
    tap(
      (data: T) => writeToConsole(data, prefixes, 'default'),
      (data: Error) => writeToConsole(data, prefixes, 'error')
    )
  );
};

function writeToConsole<T>(data: T, prefixes: unknown[], logger: 'error' | 'default' = 'default'): void {
  const { group, log, groupCollapsed, trace, groupEnd, error }: Console = console;
  group('tapLog');
  logger === 'default' ? log(...prefixes, data) : error(...prefixes, data);
  groupCollapsed('trace');
  trace();
  groupEnd();
  groupEnd();
}
