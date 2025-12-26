import { BehaviorSubject, defer, Observable, OperatorFunction, ReplaySubject } from 'rxjs';
import { finalize, switchMap, take } from 'rxjs/operators';

export function flipFlagOnFinalize<T>(
  flagSubject$: BehaviorSubject<boolean> | ReplaySubject<boolean>
): OperatorFunction<T, T> {
  return (source: Observable<T>): Observable<T> =>
    defer(() => {
      flagSubject$.pipe(
        take(1),
        switchMap((flagValue: boolean) => {
          flagSubject$.next(!flagValue);
          return source.pipe(finalize(() => flagSubject$.next(flagValue)));
        })
      );
    });
}
