import { isNil } from '@bimeister/utilities.common';
import type { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Filters out values that are considered `null` or `undefined` from the source observable.
 *
 * @template T - The type of elements emitted by the source observable.
 * @returns - An operator that filters out values considered `null` or `undefined` from the source observable.
 * @example
 * const input$: Observable<unknown> = from([null, undefined, '', 'string']);

  input$
    .pipe(filterNotNil())
    .subscribe((output: unknown) => { ... })
 */
export const filterNotNil: <T>() => OperatorFunction<T, NonNullable<T>> =
  <T>() =>
  (source$: Observable<T>): Observable<NonNullable<T>> =>
    source$.pipe(filter((value: T): value is NonNullable<T> => !isNil(value)));
