import type { MonoTypeOperatorFunction, Observable, SchedulerLike } from 'rxjs';
import { observeOn } from 'rxjs/operators';
import { isNil } from '../../common/is-nil.function';
import type { Nullable } from '../../types/nullable.type';

export const observeOnOptional =
  <T>(scheduler: Nullable<SchedulerLike>, delay?: number): MonoTypeOperatorFunction<T> =>
  (source: Observable<T>): Observable<T> => {
    if (isNil(scheduler)) {
      return source;
    }

    return source.pipe(observeOn(scheduler, delay));
  };
