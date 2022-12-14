import { isNil } from '@bimeister/utilities.common';
import type { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export const mapToIsNotNil =
  <T>(): OperatorFunction<T, boolean> =>
  (source: Observable<T>): Observable<boolean> =>
    source.pipe(map<T, boolean>((value: T) => !isNil(value)));
