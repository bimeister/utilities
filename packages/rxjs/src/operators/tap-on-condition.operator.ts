import type { Observable, OperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Conditionally applies a callback using the tap operator based on the specified condition.
 *
 * @template T - The type of the elements emitted by the source observable.
 * @param condition - A function that determines the condition based on the emitted values.
 * @param callback - The callback function to be invoked when the condition is true.
 * @returns - An operator that performs a side effect for each emission on the source observable.
 * @example
 * // Displays a successful toast of saved settings if the value is greater than 10.
 * source$.pipe(..., tapOnCondition(value => value > 10, () => this.showSuccessToast()), ...)
 */
export function tapOnCondition<T>(
  condition: ((value: T) => boolean) | boolean,
  callback: (value: T) => void
): OperatorFunction<T, T> {
  return (source$: Observable<T>) =>
    source$.pipe(
      tap((value: T) => {
        if (typeof condition === 'function' && condition(value)) {
          callback(value);
        }

        if (typeof condition === 'boolean' && condition) {
          callback(value);
        }
      })
    );
}
