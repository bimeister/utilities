import type { Observable, OperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Conditionally applies a callback using the tap operator based on the specified condition.
 *
 * @template T - The type of the elements emitted by the source observable.
 * @param condition - The condition to check before invoking the callback.
 * @param callback - The callback function to be invoked when the condition is true.
 * @returns - An operator that performs a side effect for each emission on the source observable.
 * @example
 * // Displays a successful toast of saved settings if the isSaved flag is true.
 * source$.pipe(..., tapOnCondition(this.isSaved, () => this.showSuccessToast()), ...)
 */
export function tapOnCondition<T>(condition: boolean, callback: VoidFunction): OperatorFunction<T, T> {
  return (source$: Observable<T>) =>
    source$.pipe(
      tap(() => {
        if (condition) {
          callback();
        }
      })
    );
}
