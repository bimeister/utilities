import type { Constructor } from 'packages/types/src/constructor.type';
import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Conditionally applies a callback using the tap operator based on the instance of specified types.
 *
 * @template T - The type of values emitted by the source observable.
 * @template U - The type of values that are checked for instances in the source observable.
 * @param typeOrTypes - The type or types to check for instances in the source observable.
 * @param callback - The callback function to be invoked when an instance of the specified type(s) is found.
 * @returns - An operator that performs a side effect only for the emissions of the specified instance type(s).
 * @example
 *  Example with a single type
 *  const input$: Observable<unknown> = from([1, 'string', new SomeClass()]);
 *  input$.pipe(tapOnInstanceOf(SomeClass, (instance) => console.log('Found instance:', instance)));
 *
 *  Example with multiple types
 *  const input$: Observable<unknown> = from([1, 'string', new SomeClassA(), new SomeClassB()]);
 *  input$.pipe(tapOnInstanceOf([SomeClassA, SomeClassB], (instance) => console.log('Found instance:', instance)));
 */
export function tapOnInstanceOf<T, U>(
  typeOrTypes: Constructor<U> | Constructor<U>[],
  callback: (value: U) => void
): MonoTypeOperatorFunction<T> {
  return (source$: Observable<T>) =>
    source$.pipe(
      tap((value: T) => {
        const types: Constructor<U>[] = Array.isArray(typeOrTypes) ? typeOrTypes : [typeOrTypes];

        types.forEach((type: Constructor<U>) => {
          if (value instanceof type) {
            callback(value);
          }
        });
      })
    );
}
