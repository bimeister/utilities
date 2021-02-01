import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { isNil } from './../../common/is-nil.function';

export const firstNotNil = <source>(): MonoTypeOperatorFunction<source> => (
  source$: Observable<source>
): Observable<source> => {
  return source$.pipe(first<source>((value: source) => !isNil(value)));
};
