import { isEmpty } from '@workspaces/common';
import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export const filterNotEmpty =
  <T>(): MonoTypeOperatorFunction<T> =>
  (source: Observable<T>): Observable<T> =>
    source.pipe(filter<T>((value: T) => !isEmpty(value)));
