import { VOID } from 'packages/internal';
import type { Observable, OperatorFunction } from 'rxjs';
import { mapTo } from 'rxjs/operators';

export const mapToVoid =
  <T>(): OperatorFunction<T, void> =>
  (source: Observable<T>): Observable<void> => {
    return source.pipe(mapTo(VOID));
  };
