import type { Constructor } from 'packages/types/src/constructor.type';
import type { Observable, OperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';

export function tapOnInstanceOf<I>(
  typeOrTypes: Constructor<I> | Constructor<I>[],
  callback: VoidFunction
): OperatorFunction<unknown, unknown> {
  return (source$: Observable<unknown>) =>
    source$.pipe(
      tap((value: unknown) => {
        const types: Constructor<I>[] = Array.isArray(typeOrTypes) ? typeOrTypes : [typeOrTypes];
        const isSomeValueInstanceOfType: boolean = types.some((type: Constructor<I>) => value instanceof type);

        if (isSomeValueInstanceOfType) {
          callback();
        }
      })
    );
}
