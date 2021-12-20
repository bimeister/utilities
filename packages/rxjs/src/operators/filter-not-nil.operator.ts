import { isNil } from 'packages/common';
import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export const filterNotNil: <T>() => MonoTypeOperatorFunction<T> =
  <L>(): MonoTypeOperatorFunction<L> =>
  <T>(source$: Observable<T>): Observable<T> => {
    return source$.pipe(filter<T>((value: T) => !isNil(value)));
  };