import { isUuid } from '@bimeister/utilities.common';
import type { Uuid } from '@bimeister/utilities.types';
import type { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Filters out non-UUID values from the source observable.
 *
 * @returns - An operator that filters out non-UUID values from the source observable.
 * @example
 *  const input$: Observable<unknown> = from([1, 'string', {}, 'afa05a7a-a6e0-4687-b293-a2dec7c66ee0]);

    input$
      .pipe(filterUuid())
      .subscribe((output: unknown) => { ... })
 */
export function filterUuid(): OperatorFunction<string, Uuid> {
  return (source$: Observable<string>): Observable<Uuid> =>
    source$.pipe(filter((value: string): value is Uuid => isUuid(value)));
}
