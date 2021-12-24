import { sortByProperty } from 'packages/common';
import type { SortType } from 'packages/internal';
import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const mapToSortedByProperty =
  <T extends object>(key: keyof T, sortType: SortType = 'ascending'): MonoTypeOperatorFunction<T[]> =>
  (source$: Observable<T[]>): Observable<T[]> => {
    return source$.pipe(map((value: T[]) => sortByProperty(value, key, sortType)));
  };
