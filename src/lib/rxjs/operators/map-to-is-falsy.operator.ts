import type { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export const mapToIsFalsy = <T>(): OperatorFunction<T, boolean> => (source: Observable<T>): Observable<boolean> => {
  return source.pipe(map<T, boolean>((value: T) => !Boolean(value)));
};
