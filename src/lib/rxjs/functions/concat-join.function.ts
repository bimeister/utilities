import { concat, EMPTY, Observable, Subscriber, TeardownLogic } from 'rxjs';

import { isEmpty } from './../../common/is-empty.function';

export const concatJoin = <T>(...sources: Observable<T>[]): Observable<T[]> => {
  if (isEmpty(sources)) {
    return EMPTY;
  }
  return new Observable(
    (subscriber: Subscriber<T[]>): TeardownLogic => {
      const values: T[] = [];
      concat(...sources).subscribe(
        (value: T) => values.push(value),
        (error: Error) => {
          subscriber.error(error);
        },
        () => {
          subscriber.next(values);
          subscriber.complete();
        }
      );
    }
  );
};
