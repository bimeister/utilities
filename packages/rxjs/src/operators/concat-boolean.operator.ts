import type { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

type MergeType = 'and' | 'or';

/**
 * Concatenates an array of boolean values into a single boolean value based on the specified merge type.
 *
 * @typedef {'and' | 'or'} MergeType - The type of merging to be applied ('and' for logical AND, 'or' for logical OR).
 * @param [mergeType='and'] - The type of merging to be applied. Defaults to 'and'.
 * @returns - An operator that concatenates boolean values based on the specified merge type.
 * @example
 * // Concatenates an array of boolean values into a single boolean value based on logical AND
 * const input$: Observable<boolean[]> = of([true, false, true]);
 *
 * input$.pipe(concatBoolean('and')).subscribe((result: boolean) => { ... })
 */
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
