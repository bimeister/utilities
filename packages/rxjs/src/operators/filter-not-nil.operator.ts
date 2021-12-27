import { isNil } from 'packages/common';
import type { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

export const filterNotNil: <T>() => OperatorFunction<T, NonNullable<T>> =
  <L>(): OperatorFunction<L, NonNullable<L>> =>
  <T>(source$: Observable<T>): Observable<NonNullable<T>> =>
    source$.pipe(filter((value: T): value is NonNullable<T> => !isNil(value)));
