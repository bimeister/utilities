import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getArrayUniqueElements } from './../../common/get-array-unique-elements.function';

export const mapToUniqueElements =
  <T extends object>(compareBy: keyof T): MonoTypeOperatorFunction<T[]> =>
  (source$: Observable<T[]>): Observable<T[]> => {
    return source$.pipe(map((elements: T[]) => getArrayUniqueElements(elements, compareBy)));
  };
