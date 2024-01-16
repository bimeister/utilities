import type { Observable, OperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Conditionally applies a callback using the tap operator based on the specified condition.
 *
 * @template T - The type of the elements emitted by the source observable.
 * @param condition - The condition to check before invoking the callback.
 * @param callback - The callback function to be invoked when the condition is true.
 * @returns - An operator that performs a side effect for each emission on the source observable.
 */
export function tapOnCondition<T>(condition: boolean, callback: VoidFunction): OperatorFunction<T, T> {
  /**
   * Returns a new observable that, when subscribed, taps into the source observable
   * and invokes the callback if the specified condition is true.
   *
   * @param source$ - The source observable to tap into.
   * @returns - An observable that emits the same values as the source observable.
   */
  return (source$: Observable<T>) =>
    source$.pipe(
      tap(() => {
        if (condition) {
          callback();
        }
      })
    );
}
