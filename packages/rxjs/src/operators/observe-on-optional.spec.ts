import { VOID } from 'packages/constants';
import { asyncScheduler, BehaviorSubject, of } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { observeOnOptional } from './observe-on-optional';

describe('observe-on-optional.operator.ts', () => {
  let inputItems: number[];

  beforeEach(() => {
    inputItems = new Array(1000).fill(VOID).map((_, index: number) => index + 1);
  });

  it('should pass values synchronously, on usage without scheduler', (done: jest.DoneCallback) => {
    const executionIsDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    of(...inputItems)
      .pipe(
        observeOnOptional(null),
        map((_item: number, emitIndex: number) => emitIndex === inputItems.length - 1),
        withLatestFrom(executionIsDone$),
        tap(([_isLastEmit, currentExecutionStatus]: [boolean, boolean]) => {
          expect(currentExecutionStatus).toBe(false);
        }),
        filter(([isLastEmit, _currentExecutionStatus]: [boolean, boolean]) => isLastEmit)
      )
      .subscribe(() => done());

    executionIsDone$.next(true);
  }, 10000);

  it('should pass values asynchronously, on usage with asyncScheduler', (done: jest.DoneCallback) => {
    const executionIsDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    of(...inputItems)
      .pipe(
        observeOnOptional(asyncScheduler),
        map((_item: number, emitIndex: number) => emitIndex === inputItems.length - 1),
        withLatestFrom(executionIsDone$),
        tap(([_isLastEmit, currentExecutionStatus]: [boolean, boolean]) => {
          expect(currentExecutionStatus).toBe(true);
        }),
        filter(([isLastEmit, _currentExecutionStatus]: [boolean, boolean]) => isLastEmit)
      )
      .subscribe(() => done());

    executionIsDone$.next(true);
  }, 10000);
});
