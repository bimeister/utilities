import type { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export const invertBoolean =
  (): OperatorFunction<boolean, boolean> =>
  (source$: Observable<boolean>): Observable<boolean> =>
    source$.pipe(map((value: boolean) => !value));
