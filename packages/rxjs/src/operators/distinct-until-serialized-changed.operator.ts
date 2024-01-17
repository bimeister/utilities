import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

/**
 * Filters out consecutive emissions from the source observable that have the same serialized representation.
 *
 * @template T - The type of elements emitted by the source observable.
 * @returns - An operator that filters out consecutive equal values based on their serialized representation.
 * @example
 * // Filters out consecutive emissions from the source observable
 * // that have the same serialized representation of an object with type User
 * const source$: Observable<User> = from([
      { id: 1, name: 'test' },
      { id: 1, name: 'test' },
      { id: 1, name: 'test' }
    ]);

   source$.pipe(distinctUntilSerializedChanged()).subscribe((output: User) => { ... })
 */
export const distinctUntilSerializedChanged =
  <T>(): MonoTypeOperatorFunction<T> =>
  (source: Observable<T>): Observable<T> =>
    source.pipe(
      distinctUntilChanged<T>(
        (previousValue: T, currentValue: T) => JSON.stringify(previousValue) === JSON.stringify(currentValue)
      )
    );
