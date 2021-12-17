import { isNil } from 'packages/common';
import type { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export const mapToIsNil =
  <T>(): OperatorFunction<T, boolean> =>
  (source: Observable<T>): Observable<boolean> => {
    return source.pipe(map<T, boolean>((value: T) => isNil(value)));
  };
