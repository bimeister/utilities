import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { isEmpty } from './../../common/is-empty.function';

export const filterNotEmpty = <T>(): MonoTypeOperatorFunction<T> => (source: Observable<T>): Observable<T> => {
  return source.pipe(filter<T>((value: T) => !isEmpty(value)));
};
