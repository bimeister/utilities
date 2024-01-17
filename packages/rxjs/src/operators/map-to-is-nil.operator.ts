import { isNil } from '@bimeister/utilities.common';
import type { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Maps values emitted by the source observable to a boolean indicating whether the value is `null` or `undefined`.
 *
 * @template T - The type of elements emitted by the source observable.
 * @returns - An operator that maps values to a boolean indicating whether they are `null` or `undefined`.
 * @example
 * const input$: Observable<unknown> = from([null, '', 0, undefined]);

  input$
    .pipe(mapToIsNil())
    .subscribe((output: unknown) => { ... })
 */
export const mapToIsNil: <T>() => OperatorFunction<T, boolean> =
  <T>() =>
  (source: Observable<T>): Observable<boolean> =>
    source.pipe(map<T, boolean>((value: T) => isNil(value)));
