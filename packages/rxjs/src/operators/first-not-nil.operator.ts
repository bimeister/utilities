import { isNil } from '@bimeister/utilities.common';
import type { Observable, OperatorFunction } from 'rxjs';
import { first } from 'rxjs/operators';

export const firstNotNil =
  <T>(): OperatorFunction<T, NonNullable<T>> =>
  (source$: Observable<T>): Observable<NonNullable<T>> =>
    source$.pipe(first((value: T): value is NonNullable<T> => !isNil(value)));
