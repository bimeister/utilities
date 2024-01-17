import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Filters out truthy values from the source observable.
 *
 * @template T - The type of elements emitted by the source observable.
 * @returns - An operator that filters out truthy values from the source observable.
 * @example
 *  const input$: Observable<unknown> = from([1, 'string', false, true]);

    input$
      .pipe(filterFalsy())
      .subscribe((output: unknown) => { ... })
 */
export const filterFalsy: <T>() => MonoTypeOperatorFunction<T> =
  <T>() =>
  (source: Observable<T>): Observable<T> =>
    source.pipe(filter<T>((value: T) => !Boolean(value)));
