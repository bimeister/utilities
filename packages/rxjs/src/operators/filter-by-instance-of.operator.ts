import type { Constructor } from 'packages/types/src/constructor.type';
import type { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

export function filterByInstanceOf<I>(...types: Constructor<I>[]): OperatorFunction<unknown, I> {
  return (source$: Observable<unknown>) =>
    source$.pipe(filter((value: unknown): value is I => types.some((type: Constructor<I>) => value instanceof type)));
}
