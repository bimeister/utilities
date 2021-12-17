import { isNil } from 'packages/common';
import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

export const firstNotNil =
  <source>(): MonoTypeOperatorFunction<source> =>
  (source$: Observable<source>): Observable<source> => {
    return source$.pipe(first<source>((value: source) => !isNil(value)));
  };
