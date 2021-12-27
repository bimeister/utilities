import type { RxjsFilterPredicate } from 'packages/internal';
import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

export const filterByLatestFrom =
  <T, P>(observable: Observable<P>, predicate: RxjsFilterPredicate<P>): MonoTypeOperatorFunction<T> =>
  (source: Observable<T>): Observable<T> =>
    source.pipe(
      withLatestFrom(observable),
      filter(([_sourceValue, testValue]: [T, P], index: number) => predicate(testValue, index)),
      map(([sourceValue, _testValue]: [T, P]) => sourceValue)
    );
