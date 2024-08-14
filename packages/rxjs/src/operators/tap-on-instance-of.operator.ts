import type { Constructor } from 'packages/types/src/constructor.type';
import type { Observable, OperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Conditionally applies a callback using the tap operator based on the instance of specified types.
 *
 * @template I - The type of instances to check for in the source observable.
 * @param typeOrTypes - The type or types to check for instance of in the source observable.
 * @param callback - The callback function to be invoked when an instance of the specified type is found.
 * @returns - An operator that performs a side effect for each emission on the source observable.
 * @example
 * Based on the values produced by the source observable,
 * performs a side-effect only on an instance of the specified SomeClass type
 * const input$: Observable<unknown> = from([1, 'string', { name: 'Some name' }, new SomeClass()]);

   input$
    .pipe(tapOnInstanceOf(SomeClass, () => this.showAlert()))
 */
export function tapOnInstanceOf<T>(
  typeOrTypes: Constructor<T> | Constructor<T>[],
  callback: (value: T) => void
): OperatorFunction<unknown, unknown> {
  return (source$: Observable<unknown>) =>
    source$.pipe(
      tap((value: unknown) => {
        const types: Constructor<T>[] = Array.isArray(typeOrTypes) ? typeOrTypes : [typeOrTypes];

        types.forEach((type: Constructor<T>) => {
          if (value instanceof type) {
            callback(value);
          }
        });
      })
    );
}
