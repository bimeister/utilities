import type { Constructor } from 'packages/types/src/constructor.type';
import type { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Filters the values emitted by the source observable based on the instance of specified types.
 *
 * @template I - The type of instances to filter for in the source observable.
 * @param types - The types to filter for instance of in the source observable.
 * @returns - An operator that filters the source observable based on the specified types.
 * @example
 * // Filters the values produced by the source observable based on an instance of the specified SomeClass instance type
 * const input$: Observable<unknown> = from([1, 'string', { name: 'Some name' }, new SomeClass()]);

  input$
    .pipe(filterByInstanceOf(SomeClass))
 */
export function filterByInstanceOf<I>(...types: Constructor<I>[]): OperatorFunction<unknown, I> {
  return (source$: Observable<unknown>) =>
    source$.pipe(filter((value: unknown): value is I => types.some((type: Constructor<I>) => value instanceof type)));
}
