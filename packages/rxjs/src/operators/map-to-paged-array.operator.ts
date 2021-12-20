import { getPagedArray } from 'packages/common';
import type { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export const mapToPagedArray =
  <T>(perPageCount: number): OperatorFunction<T[], T[][]> =>
  (source: Observable<T[]>): Observable<T[][]> => {
    return source.pipe(map<T[], T[][]>((value: T[]) => getPagedArray(value, perPageCount)));
  };