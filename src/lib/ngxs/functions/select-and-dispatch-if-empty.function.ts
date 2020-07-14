import type { Observable } from 'rxjs';
import { exhaustMap, switchMapTo, take } from 'rxjs/operators';

export const selectAndDispatchIfEmpty = <T>(
  storeData: Observable<T>,
  isNotEmpty: (selectedData: T) => boolean,
  dispatcherFactory: () => () => Observable<void>
): Observable<T> => {
  return storeData.pipe(
    take(1),
    exhaustMap((selectedData: T) =>
      !isNotEmpty(selectedData) ? createDispatcher(dispatcherFactory()).pipe(switchMapTo(storeData)) : storeData
    )
  );
};

const createDispatcher = (factory: () => Observable<void>): Observable<void> => factory();
