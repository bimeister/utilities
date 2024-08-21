import type { Falsy } from '@bimeister/utilities.types';
import type { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Filters out truthy values from the source observable, emitting only falsy values
 * (`false`, `0`, `''`, `null`, `undefined`, `NaN`).
 *
 * @template T - The type of elements emitted by the source observable.
 * @returns An operator that filters out truthy values from the source observable.
 * @example
 * const input$: Observable<unknown> = from([1, 'string', false, null, undefined, 0]);
 *
 * input$
 *   .pipe(filterFalsy())
 *   .subscribe((output: unknown) => { ... });
 */
export const filterFalsy: <T>() => OperatorFunction<T, Extract<T, Falsy>> =
  <T>() =>
  (source: Observable<T>): Observable<Extract<T, Falsy>> =>
    source.pipe(filter((value: T): value is Extract<T, Falsy> => !Boolean(value)));
