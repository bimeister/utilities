import type { StateContext } from '@ngxs/store';
import { isNil } from 'packages/common';
import { filterNotNil } from 'packages/rxjs';
import { iif, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { getFromStateByProperty } from './get-from-state-by-property.function';

export const dispatchIfEmpty = <T>(
  context: StateContext<T[]>,
  findByPropertyName: keyof T,
  targetPropertyValue: T[keyof T],
  dispatcher: () => Observable<void>
): Observable<T> => {
  const existingData: T = getFromStateByProperty(context, findByPropertyName, targetPropertyValue);

  return iif(
    () => isNil(existingData),
    dispatcher().pipe(
      map(() => getFromStateByProperty(context, findByPropertyName, targetPropertyValue)),
      take(1),
      filterNotNil()
    ),
    of(existingData).pipe(take(1))
  );
};
