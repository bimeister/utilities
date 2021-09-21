import type { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNil } from './../../common/is-nil.function';

export const mapToIsNotNil =
  <T>(): OperatorFunction<T, boolean> =>
  (source: Observable<T>): Observable<boolean> => {
    return source.pipe(map<T, boolean>((value: T) => !isNil(value)));
  };
