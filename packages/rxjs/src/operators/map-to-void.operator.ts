import { VOID } from '@bimeister/utilities.constants';
import type { Observable, OperatorFunction } from 'rxjs';
import { mapTo } from 'rxjs/operators';

/**
 * Maps values emitted by the source observable to `void`.
 *
 * @template T - The type of elements emitted by the source observable.
 * @returns - An operator that maps values to `void`.
 * @example
 *  const input$: Observable<number[]> = of([1, 2, 3]);

    input$
      .pipe(mapToVoid())
      .subscribe(() => { ... })
 */
export const mapToVoid =
  <T>(): OperatorFunction<T, void> =>
  (source: Observable<T>): Observable<void> =>
    source.pipe(mapTo(VOID));
