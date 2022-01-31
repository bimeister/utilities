import { VOID } from '@bimeister/utilities.constants';
import type { Observable, OperatorFunction } from 'rxjs';
import { mapTo } from 'rxjs/operators';

export const mapToVoid =
  <T>(): OperatorFunction<T, void> =>
  (source: Observable<T>): Observable<void> =>
    source.pipe(mapTo(VOID));
