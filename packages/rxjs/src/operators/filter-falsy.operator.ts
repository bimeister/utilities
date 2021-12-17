import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export const filterFalsy =
  <T>(): MonoTypeOperatorFunction<T> =>
  (source: Observable<T>): Observable<T> => {
    return source.pipe(filter<T>((value: T) => !Boolean(value)));
  };
