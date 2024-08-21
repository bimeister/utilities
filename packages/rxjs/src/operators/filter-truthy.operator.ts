import type { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Filters out falsy values (`false`, `0`, `''`, `null`, `undefined`, `NaN`) from the source observable.
 *
 * @template T - The type of elements emitted by the source observable.
 * @returns An operator that filters out falsy values from the source observable.
 * @example
 * const input$: Observable<unknown> = from([1, 'string', false, true]);
 *
 * input$
 *   .pipe(filterTruthy())
 *   .subscribe((output: unknown) => { ... });
 */
export const filterTruthy: <T>() => OperatorFunction<T, NonNullable<T>> =
  <T>() =>
  (source: Observable<T>): Observable<NonNullable<T>> =>
    source.pipe(filter((value: T): value is NonNullable<T> => Boolean(value)));
