import type { Constructor } from 'packages/types/src/constructor.type';
import type { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Filters the values emitted by the source observable based on the instance of specified types.
 *
 * @template Source - The type of source values in the source observable.
 * @template Result - The type of result values to filter for in the source observable.
 * @param types - The types to filter for instance of in the source observable.
 * @returns - An operator that filters the source observable based on the specified types.
 * @example
 * Filters the values produced by the source observable based on an instance of the specified SomeClass instance type
 * const input$: Observable<unknown> = from([1, 'string', { name: 'Some name' }, new SomeClass()]);

  input$
    .pipe(filterByInstanceOf(SomeClass))
 */
export function filterByInstanceOf<Source, Result extends Source>(
  ...types: Constructor<Result>[]
): OperatorFunction<Source, Result>;
export function filterByInstanceOf<Source, Result extends Source>(
  ...types: Constructor<Result>[]
): OperatorFunction<Source[], Source[]>;
export function filterByInstanceOf<Source, Result extends Source>(
  ...types: Constructor<Result>[]
): OperatorFunction<Source | Source[], Result | Source[]> {
  return (source$: Observable<Source | Source[]>): Observable<Result | Source[]> =>
    source$.pipe(
      filter((value: Source | Source[]): value is Result | Source[] =>
        Array.isArray(value)
          ? value.some((item: Source) => types.some((type: Constructor<Result>) => item instanceof type))
          : types.some((type: Constructor<Result>) => value instanceof type)
      )
    );
}
