import { BehaviorSubject, combineLatest, Observable, OperatorFunction } from 'rxjs';
import { buffer, distinctUntilChanged, filter, map, take, tap, withLatestFrom } from 'rxjs/operators';
import { RxjsFilterPredicate } from './../../../internal/types/rxjs-filter-predicate.type';
import { filterTruthy } from './filter-truthy.operator';
import { mapToVoid } from './map-to-void.operator';

type Marker = 'leading-marker' | 'trailing-marker' | 'buffer-item';

export const bufferFromTo = <T>(
  leadingMarkerPredicate: RxjsFilterPredicate<T>,
  trailingMarkerPredicate: RxjsFilterPredicate<T>
): OperatorFunction<T, T[]> => (source: Observable<T>): Observable<T[]> => {
  const isLeadingMarkerPassed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const isTrailingMarkerPassed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  const onSliceReady$: Observable<void> = combineLatest([isLeadingMarkerPassed$, isTrailingMarkerPassed$]).pipe(
    map((markerStatuses: boolean[]) => markerStatuses.every((isPassed: boolean) => isPassed)),
    distinctUntilChanged(),
    filterTruthy(),
    mapToVoid(),
    take(1)
  );

  return source.pipe(
    map((input: T, index: number): [Marker, T] => {
      const isLeadingMarker: boolean = leadingMarkerPredicate(input, index);
      if (isLeadingMarker) {
        return ['leading-marker', input];
      }

      const isTrailingMarker: boolean = trailingMarkerPredicate(input, index);
      if (isTrailingMarker) {
        return ['trailing-marker', input];
      }

      return ['buffer-item', input];
    }),
    tap(([marker, _input]: [Marker, T]) => {
      if (marker === 'leading-marker') {
        isLeadingMarkerPassed$.next(true);
      }

      if (marker === 'trailing-marker') {
        isTrailingMarkerPassed$.next(true);
      }
    }),
    withLatestFrom(isLeadingMarkerPassed$, isTrailingMarkerPassed$),
    filter(([[marker, _input], isLeadingMarkerPassed, isTrailingMarkerPassed]: [[Marker, T], boolean, boolean]) => {
      return marker === 'buffer-item' && isLeadingMarkerPassed && !isTrailingMarkerPassed;
    }),
    map(([[_marker, input], _isLeadingMarkerPassed, _isTrailingMarkerPassed]: [[Marker, T], boolean, boolean]) => {
      return input;
    }),
    buffer(onSliceReady$),
    take(1)
  );
};
