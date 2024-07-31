import type { Constructor } from 'packages/types/src/constructor.type';
import type { Observable, OperatorFunction } from 'rxjs';
import { take } from 'rxjs/operators';
import { filterByInstanceOf } from './filter-by-instance-of.operator';

/**
 * Filters the first value emitted by the source observable based on the instance of specified types and then completes.
 *
 * @template I - The type of instances to filter for in the source observable.
 * @param types - The types to filter for instance of in the source observable.
 * @returns - An operator that filters the source observable based on the specified types
 * and completes after the first match.
 * @example
 * // Filters the values produced by the source observable based on an instance of the specified SomeClass instance type
 * const input$: Observable<unknown> = from([1, 'string', { name: 'Some name' }, new SomeClass()]);

  input$
    .pipe(firstEventByInstanceOf(SomeClass))
 */
export function firstEventByInstanceOf<I>(...types: Constructor<I>[]): OperatorFunction<unknown, I> {
  return (source$: Observable<unknown>) => source$.pipe(filterByInstanceOf(...types), take(1));
}
