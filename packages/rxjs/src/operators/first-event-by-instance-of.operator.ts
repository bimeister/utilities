import { Observable, take } from 'rxjs';
import { filterByInstanceOf } from './filter-by-instance-of.operator';

type FilteredOutput<Source, TypesToFilterBy extends InstanceType<any>[]> = Source extends any[]
  ? Source
  : InstanceType<TypesToFilterBy[number]>;

/**
 * Emits only the first value from the source Observable that is an instance
 * of one of the specified types, then completes.
 *
 * - If the source emits single values, it emits only the first matching instance.
 * - If the source emits arrays, it emits only the first array that contains
 *   at least one instance of the specified types.
 *
 * @template TypesToFilterBy - A tuple of class constructors used for filtering.
 * @template Source - The type of values emitted by the source Observable.
 *
 * @param types - One or more class constructors whose instances should be allowed.
 *
 * @returns An RxJS operator that filters and emits only the first matching value.
 *
 * @example
 * // Emitting the first matching instance:
 * import { from } from 'rxjs';
 *
 * class SomeClassA {}
 * class SomeClassB {}
 *
 * const source$ = from([
 *   new SomeClassA(),
 *   new SomeClassB(),
 *   {}
 * ]);
 *
 * source$
 *   .pipe(firstEventByInstanceOf(SomeClassA, SomeClassB))
 *   .subscribe((value) => {
 *     console.log(value); // Logs only the first matching instance
 *   });
 *
 * @example
 * // Emitting the first matching array:
 * import { from } from 'rxjs';
 *
 * class SomeClassC {}
 * class SomeClassD {}
 *
 * const source$ = from([
 *   [new SomeClassC(), new SomeClassD()],
 *   [{}] // This will not be emitted
 * ]);
 *
 * source$
 *   .pipe(firstEventByInstanceOf(SomeClassD))
 *   .subscribe((value) => {
 *     console.log(value); // Logs the first array containing SomeClassD
 *   });
 */
export function firstEventByInstanceOf<TypesToFilterBy extends InstanceType<any>[]>(
  ...types: TypesToFilterBy
): <Source>(source$: Observable<Source>) => Observable<FilteredOutput<Source, TypesToFilterBy>> {
  return <Source>(source$: Observable<Source>): Observable<FilteredOutput<Source, TypesToFilterBy>> =>
    source$.pipe(filterByInstanceOf(...types), take(1));
}
