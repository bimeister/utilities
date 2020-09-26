import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

import { getPagedArray } from './../../common/get-paged-array.function';

export const mapToPagedArray = <T>(perPageCount: number): OperatorFunction<T[], T[][]> => (
  source: Observable<T[]>
): Observable<T[][]> => {
  return source.pipe(
    map<T[], T[][]>((value: T[]) => getPagedArray(value, perPageCount))
  );
};
