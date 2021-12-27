import { getPagedArray } from '@workspaces/common';
import type { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export const mapToPagedArray =
  <T>(perPageCount: number): OperatorFunction<T[], T[][]> =>
  (source: Observable<T[]>): Observable<T[][]> =>
    source.pipe(map<T[], T[][]>((value: T[]) => getPagedArray(value, perPageCount)));
