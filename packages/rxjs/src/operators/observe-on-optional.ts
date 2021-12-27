import { isNil } from '@workspaces/common';
import type { Nullable } from '@workspaces/types';
import type { MonoTypeOperatorFunction, Observable, SchedulerLike } from 'rxjs';
import { observeOn } from 'rxjs/operators';

export const observeOnOptional =
  <T>(scheduler: Nullable<SchedulerLike>, delay?: number): MonoTypeOperatorFunction<T> =>
  (source: Observable<T>): Observable<T> => {
    if (isNil(scheduler)) {
      return source;
    }

    return source.pipe(observeOn(scheduler, delay));
  };
