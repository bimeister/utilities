import { VOID } from 'packages/internal';
import { asyncScheduler, BehaviorSubject, of } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { subscribeOnOptional } from './subscribe-on-optional';

describe('subscribe-on-optional.operator.ts', () => {
  let inputItems: number[];

  beforeEach(() => {
    inputItems = new Array(1000).fill(VOID).map((_, index: number) => index + 1);
  });

  it('should pass values synchronously, on usage without scheduler', (done: jest.DoneCallback) => {
    const executionIsDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    of(...inputItems)
      .pipe(
        subscribeOnOptional(null),
        map((_item: number, emitIndex: number) => emitIndex === inputItems.length - 1),
        withLatestFrom(executionIsDone$),
        filter(([isLastEmit, _currentExecutionStatus]: [boolean, boolean]) => isLastEmit),
        map(([_isLastEmit, currentExecutionStatus]: [boolean, boolean]) => currentExecutionStatus)
      )
      .subscribe((currentExecutionStatus: boolean) => {
        expect(currentExecutionStatus).toBe(false);
        done();
      });

    executionIsDone$.next(true);
  }, 10000);

  it('should pass values asynchronously, on usage with asyncScheduler', (done: jest.DoneCallback) => {
    const executionIsDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    of(...inputItems)
      .pipe(
        subscribeOnOptional(asyncScheduler),
        map((_item: number, emitIndex: number) => emitIndex === inputItems.length - 1),
        withLatestFrom(executionIsDone$),
        filter(([isLastEmit, _currentExecutionStatus]: [boolean, boolean]) => isLastEmit),
        map(([_isLastEmit, currentExecutionStatus]: [boolean, boolean]) => currentExecutionStatus)
      )
      .subscribe((currentExecutionStatus: boolean) => {
        expect(currentExecutionStatus).toBe(true);
        done();
      });

    executionIsDone$.next(true);
  }, 10000);
});
