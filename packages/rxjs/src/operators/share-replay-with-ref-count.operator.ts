import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

/**
 * Shares and replays the values emitted by the source observable with reference counting.
 *
 * @template T - The type of elements emitted by the source observable.
 * @returns - An operator that shares and replays values with reference counting.
 */
export const shareReplayWithRefCount =
  <T>(): MonoTypeOperatorFunction<T> =>
  (source: Observable<T>): Observable<T> =>
    source.pipe(
      shareReplay({
        refCount: true,
        bufferSize: 1,
      })
    );
