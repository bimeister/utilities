import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export const distinctUntilSerializedChanged = <T>(): MonoTypeOperatorFunction<T> => (
  source: Observable<T>
): Observable<T> => {
  return source.pipe(
    distinctUntilChanged<T>(
      (previousValue: T, currentValue: T) => JSON.stringify(previousValue) === JSON.stringify(currentValue)
    )
  );
};
