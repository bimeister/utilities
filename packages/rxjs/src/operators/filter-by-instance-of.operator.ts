import { Observable, filter } from 'rxjs';

type FilteredOutput<Source, TypesToFilterBy extends InstanceType<any>[]> = Source extends any[]
  ? Source
  : InstanceType<TypesToFilterBy[number]>;

/**
 * Filters emitted values from the source Observable, allowing only those that are instances
 * of at least one of the specified types.
 *
 * - If the Observable emits single values, only those instances that match one of the specified types
 *   are emitted.
 * - If the Observable emits arrays, only arrays that contain at least one instance of the specified types
 *   are emitted. The output type remains the same as the input type.
 *
 * @template TypesToFilterBy - A tuple of class constructors used for filtering.
 * @template Source - The type of values emitted by the source Observable.
 *
 * @param types - One or more class constructors whose instances should be allowed.
 *
 * @returns An RxJS operator that filters emitted values based on their instance type.
 *
 * @example
 * // Filtering single values:
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
 *   .pipe(filterByInstanceOf(SomeClassA, SomeClassB))
 *   .subscribe((instance) => {
 *     console.log(instance); // Logs only instances of SomeClassA or SomeClassB
 *   });
 *
 * @example
 * // Filtering arrays:
 * import { from, Observable } from 'rxjs';
 *
 * class SomeClassC {}
 * class SomeClassD {}
 *
 * const source$ = from([
 *   [new SomeClassC(), new SomeClassD()],
 *   [{}] // This array will be filtered out
 * ]);
 *
 * source$
 *   .pipe(filterByInstanceOf(SomeClassD))
 *   .subscribe((filteredArray) => {
 *     console.log(filteredArray); // Logs arrays containing at least one instance of SomeClassD
 *   });
 */
export function filterByInstanceOf<TypesToFilterBy extends InstanceType<any>[]>(
  ...types: TypesToFilterBy
): <Source>(source$: Observable<Source>) => Observable<FilteredOutput<Source, TypesToFilterBy>> {
  return <Source>(source$: Observable<Source>): Observable<FilteredOutput<Source, TypesToFilterBy>> =>
    source$.pipe(
      filter((source: Source): source is FilteredOutput<Source, TypesToFilterBy> => {
        if (Array.isArray(source)) {
          return source.some((sourceItem: any) => types.some((type: InstanceType<any>) => sourceItem instanceof type));
        }
        return types.some((type: InstanceType<any>) => source instanceof type);
      })
    );
}
