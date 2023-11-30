import type { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

type MergeType = 'and' | 'or';

export const concatBoolean =
  (mergeType?: MergeType): OperatorFunction<boolean[], boolean> =>
  (source$: Observable<boolean[]>): Observable<boolean> =>
    source$.pipe(
      map((valuesList: boolean[]) => {
        const sanitizedMergeType: MergeType = mergeType ?? 'and';

        if (sanitizedMergeType === 'and') {
          return valuesList.every((value: boolean) => value);
        }

        return valuesList.some((value: boolean) => value);
      })
    );
