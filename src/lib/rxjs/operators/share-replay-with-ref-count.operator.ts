import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

export const shareReplayWithRefCount = <T>(): MonoTypeOperatorFunction<T> => (source: Observable<T>): Observable<T> => {
  return source.pipe(
    // tslint:disable-next-line: ban
    shareReplay({
      refCount: true,
      bufferSize: 1
    })
  );
};
