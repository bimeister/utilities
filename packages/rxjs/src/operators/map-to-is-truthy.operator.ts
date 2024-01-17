import type { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Maps values emitted by the source observable to a boolean indicating whether the value is truthy.
 *
 * @template T - The type of elements emitted by the source observable.
 * @returns - An operator that maps values to a boolean indicating whether they are truthy.
 * @example
 *  const input$: Observable<unknown> = from([1, '', 0, 'string']);

    input$
      .pipe(mapToIsTruthy())
      .subscribe((output: unknown) => { ... })
 */
export const mapToIsTruthy: <T>() => OperatorFunction<T, boolean> =
  <T>() =>
  (source: Observable<T>): Observable<boolean> =>
    source.pipe(map<T, boolean>((value: T) => Boolean(value)));
