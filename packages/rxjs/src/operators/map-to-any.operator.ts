import type { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * @deprecated use for testing purposes only
 */
export const mapToAny =
  <T>(): OperatorFunction<T, any> =>
  (source: Observable<T>): Observable<any> =>
    source.pipe(map<T, any>((value: T) => value));
