import type { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Inverts boolean values emitted by the source observable.
 *
 * @returns - An operator that inverts boolean values emitted by the source observable.
 * @example
 * const input$: Observable<boolean> = of(true, true, true);

   input$.pipe(invertBoolean()).subscribe((result: boolean) => { ... })
 */
export const invertBoolean: () => OperatorFunction<boolean, boolean> =
  () =>
  (source$: Observable<boolean>): Observable<boolean> =>
    source$.pipe(map((value: boolean) => !value));
