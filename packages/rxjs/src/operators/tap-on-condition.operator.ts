import { isNil } from '@bimeister/utilities.common';
import { Observable, OperatorFunction, tap } from 'rxjs';

/**
 * Conditionally applies callbacks using the tap operator based on the specified condition.
 *
 * @template T - The type of the elements emitted by the source observable.
 * @param condition - A function that determines the condition based on the emitted values or a boolean value.
 * @param trueCallback - The callback function to be invoked when the condition is true.
 * @param falseCallback - The optional callback function to be invoked when the condition is false.
 * @returns - An operator that performs side effects for each emission on the source observable.
 * @example
 * // Displays a successful toast of saved settings if the value is greater than 10.
 * source$.pipe(..., tapOnCondition(value => value > 10, () => this.showSuccessToast(), () => this.showErrorToast()))
 */
export function tapOnCondition<T>(
  condition: ((value: T) => boolean) | boolean,
  trueCallback: (value: T) => void,
  falseCallback?: (value: T) => void
): OperatorFunction<T, T> {
  return (source$: Observable<T>) =>
    source$.pipe(
      tap((value: T) => {
        const conditionResult: boolean = typeof condition === 'function' ? condition(value) : condition;

        if (conditionResult) {
          trueCallback(value);
        } else if (!isNil(falseCallback)) {
          falseCallback(value);
        }
      })
    );
}
