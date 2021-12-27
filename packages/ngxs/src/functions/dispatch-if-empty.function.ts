import type { StateContext } from '@ngxs/store';
import { isNil } from '@workspaces/common';
import { filterNotNil } from '@workspaces/rxjs';
import { iif, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { getFromStateByProperty } from './get-from-state-by-property.function';

export const dispatchIfEmpty = <T extends object>(
  context: StateContext<T[]>,
  findByPropertyName: keyof T,
  targetPropertyValue: T[keyof T],
  dispatcher: () => Observable<void>
): Observable<T | undefined> => {
  const existingData: T | undefined = getFromStateByProperty(context, findByPropertyName, targetPropertyValue);

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
