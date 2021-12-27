import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

export const shareReplayWithRefCount =
  <T>(): MonoTypeOperatorFunction<T> =>
  (source: Observable<T>): Observable<T> =>
    source.pipe(
      shareReplay({
        refCount: true,
        bufferSize: 1
      })
    );
