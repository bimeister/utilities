import type { Falsy } from '@bimeister/utilities.types';
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
export const filterTruthy: <T>() => OperatorFunction<T, Exclude<T, Falsy>> =
  <T>() =>
  (source: Observable<T>): Observable<Exclude<T, Falsy>> =>
    source.pipe(filter((value: T): value is Exclude<T, Falsy> => Boolean(value)));
