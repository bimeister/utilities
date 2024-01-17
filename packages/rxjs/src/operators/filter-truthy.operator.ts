import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Filters out falsy values from the source observable.
 *
 * @template T - The type of elements emitted by the source observable.
 * @returns - An operator that filters out falsy values from the source observable.
 * @example
 *  const input$: Observable<unknown> = from([1, 'string', false, true]);

    input$
      .pipe(filterTruthy())
      .subscribe((output: unknown) => { ... })
 */
export const filterTruthy: <T>() => MonoTypeOperatorFunction<T> =
  <T>() =>
  (source: Observable<T>): Observable<T> =>
    source.pipe(filter<T>((value: T) => Boolean(value)));
