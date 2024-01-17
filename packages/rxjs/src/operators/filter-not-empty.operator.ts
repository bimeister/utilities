import { isEmpty } from '@bimeister/utilities.common';
import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Filters out values that are considered empty from the source observable.
 *
 * @template T - The type of elements emitted by the source observable.
 * @returns - An operator that filters out values considered empty from the source observable.
 * @example
 * const input$: Observable<unknown> = from([null, undefined, '', 'string', [], {}]);

  input$
    .pipe(filterNotEmpty())
    .subscribe((output: unknown) => { ... })
 */
export const filterNotEmpty: <T>() => MonoTypeOperatorFunction<T> =
  <T>() =>
  (source: Observable<T>): Observable<T> =>
    source.pipe(filter<T>((value: T) => !isEmpty(value)));
