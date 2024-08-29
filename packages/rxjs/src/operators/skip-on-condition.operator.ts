import type { Observable, OperatorFunction } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

/**
 * Combines values from the source observable with the latest value from another observable,
 * filters them based on a predicate, and then maps to the source value.
 *
 * @template T The type of values emitted by the source observable.
 * @template O The type of values emitted by the other observable.
 *
 * @param other$ The other observable to combine with the source observable.
 * @param predicate A function that takes the latest value from the other observable and returns a boolean.
 *                  The source value is emitted only if the predicate returns true.
 * @returns An operator function that returns an observable emitting the source values that pass the predicate check.
 */
export function skipOnCondition<T, O>(
  other$: Observable<O>,
  predicate: (otherValue: O) => boolean
): OperatorFunction<T, T> {
  return (source$: Observable<T>) =>
    source$.pipe(
      withLatestFrom(other$),
      filter(([_, otherValue]: [T, O]): boolean => predicate(otherValue)),
      map(([sourceValue, _]: [T, O]): T => sourceValue)
    );
}
