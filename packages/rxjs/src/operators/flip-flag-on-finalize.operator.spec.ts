import { BehaviorSubject, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { flipFlagOnFinalize } from './flip-flag-on-finalize.operator';

describe('flip-flag-on-finalize.operator.ts', () => {
  let isLoading$: BehaviorSubject<boolean>;

  beforeEach(() => {
    isLoading$ = new BehaviorSubject<boolean>(false);
  });

  it('should set loading state to false after source completes', () => {
    of('test')
      .pipe(flipFlagOnFinalize(isLoading$))
      .subscribe({
        complete: () => {
          expect(isLoading$.getValue()).toBe(false);
        }
      });
  });

  it('should set loading state to false after source errors', () => {
    throwError('error')
      .pipe(delay(10), flipFlagOnFinalize(isLoading$), delay(10))
      .subscribe({
        error: () => {
          expect(isLoading$.getValue()).toBe(false);
        }
      });
  });
});
