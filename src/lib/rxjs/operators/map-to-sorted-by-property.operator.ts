import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { SortType } from './../../../internal/types/sort-type.type';
import { sortByProperty } from './../../common/sort-by-property.function';

export const mapToSortedByProperty = <T>(
  key: keyof T,
  sortType: SortType = 'ascending'
): MonoTypeOperatorFunction<T[]> => (source$: Observable<T[]>): Observable<T[]> => {
  return source$.pipe(map((value: T[]) => sortByProperty(value, key, sortType)));
};
