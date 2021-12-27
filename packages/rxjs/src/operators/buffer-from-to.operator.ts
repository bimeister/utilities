import type { RxjsFilterPredicate } from '@workspaces/internal';
import { BehaviorSubject, combineLatest, Observable, OperatorFunction } from 'rxjs';
import { buffer, distinctUntilChanged, filter, map, take, tap, withLatestFrom } from 'rxjs/operators';
import { filterTruthy } from './filter-truthy.operator';
import { mapToVoid } from './map-to-void.operator';

type Marker = 'leading-marker' | 'trailing-marker' | 'combined-marker' | 'buffer-item';
interface MarkerBuilderOptions<T> {
  input: T;
  index: number;
  leadingMarkerPredicate: RxjsFilterPredicate<T>;
  trailingMarkerPredicate: RxjsFilterPredicate<T>;
}

function getMarker<T>({
  input,
  index,
  leadingMarkerPredicate,
  trailingMarkerPredicate
}: MarkerBuilderOptions<T>): Marker {
  const isLeadingMarker: boolean = leadingMarkerPredicate(input, index);
  const isTrailingMarker: boolean = trailingMarkerPredicate(input, index);
  if (isLeadingMarker && !isTrailingMarker) {
    return 'leading-marker';
  }

  if (isTrailingMarker && !isLeadingMarker) {
    return 'trailing-marker';
  }

  if (isTrailingMarker && isLeadingMarker) {
    return 'combined-marker';
  }

  return 'buffer-item';
}

export const bufferFromTo =
  <T>(
    leadingMarkerPredicate: RxjsFilterPredicate<T>,
    trailingMarkerPredicate: RxjsFilterPredicate<T>
  ): OperatorFunction<T, T[]> =>
  (source: Observable<T>): Observable<T[]> => {
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
        const marker: Marker = getMarker({ input, index, leadingMarkerPredicate, trailingMarkerPredicate });
        return [marker, input];
      }),
      tap(([marker, _input]: [Marker, T]) => {
        if (marker === 'leading-marker' || marker === 'combined-marker') {
          isLeadingMarkerPassed$.next(true);
        }

        if (marker === 'trailing-marker' || marker === 'combined-marker') {
          isTrailingMarkerPassed$.next(true);
        }
      }),
      withLatestFrom(isLeadingMarkerPassed$, isTrailingMarkerPassed$),
      filter(
        ([[marker, _input], isLeadingMarkerPassed, isTrailingMarkerPassed]: [[Marker, T], boolean, boolean]) =>
          marker === 'buffer-item' && isLeadingMarkerPassed && !isTrailingMarkerPassed
      ),
      map(
        ([[_marker, input], _isLeadingMarkerPassed, _isTrailingMarkerPassed]: [[Marker, T], boolean, boolean]) => input
      ),
      buffer(onSliceReady$),
      take(1)
    );
  };
