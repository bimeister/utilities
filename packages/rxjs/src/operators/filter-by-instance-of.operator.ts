import type { Constructor } from 'packages/types/src/constructor.type';
import type { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

export function filterByInstanceOf<I>(typeOrTypes: Constructor<I> | Constructor<I>[]): OperatorFunction<unknown, I> {
  const instanceOfTypes: ((value: unknown) => value is I)[] = Array.isArray(typeOrTypes)
    ? typeOrTypes.map(
        (type: Constructor<I>): ((value: unknown) => value is I) =>
          (value: unknown): value is I =>
            value instanceof type
      )
    : [(value: unknown): value is I => value instanceof typeOrTypes];

  return (source$: Observable<unknown>) =>
    source$.pipe(
      filter((value: unknown): value is I =>
        instanceOfTypes.some((instanceOf: (value: unknown) => value is I) => instanceOf(value))
      )
    );
}
