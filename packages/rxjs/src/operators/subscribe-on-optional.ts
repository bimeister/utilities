import { isNil } from 'packages/common';
import type { Nullable } from 'packages/types';
import type { MonoTypeOperatorFunction, Observable, SchedulerLike } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';

export const subscribeOnOptional =
  <T>(scheduler: Nullable<SchedulerLike>, delay?: number): MonoTypeOperatorFunction<T> =>
  (source: Observable<T>): Observable<T> => {
    if (isNil(scheduler)) {
      return source;
    }

    return source.pipe(subscribeOn(scheduler, delay));
  };
