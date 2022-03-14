import { isUuid } from '@bimeister/utilities.common';
import type { Uuid } from '@bimeister/utilities.types';
import type { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

export function filterUuid(): OperatorFunction<string, Uuid> {
  return (source$: Observable<string>): Observable<Uuid> =>
    source$.pipe(filter((value: string): value is Uuid => isUuid(value)));
}
