import { getArrayUniqueElements } from 'packages/common';
import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const mapToUniqueElements =
  <T extends object>(compareBy: keyof T): MonoTypeOperatorFunction<T[]> =>
  (source$: Observable<T[]>): Observable<T[]> => {
    return source$.pipe(map((elements: T[]) => getArrayUniqueElements(elements, compareBy)));
  };