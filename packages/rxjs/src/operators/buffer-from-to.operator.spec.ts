import { VOID } from 'packages/constants';
import type { Nullable } from 'packages/types';
import { BehaviorSubject, combineLatest, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { bufferFromTo } from './buffer-from-to.operator';
import { filterTruthy } from './filter-truthy.operator';

describe('buffer-from-to.operator.ts', () => {
  it('should not emit markers in buffer', (done: jest.DoneCallback) => {
    const expectedResult: string[] = new Array(1000).fill(VOID).map((_, index: number) => {
      return `${index}`;
    });
    const input: string[] = ['leading-marker', ...expectedResult, 'trailing-marker'];

    from(input)
      .pipe(
        bufferFromTo(
          (inputItem: string) => inputItem === 'leading-marker',
          (inputItem: string) => inputItem === 'trailing-marker'
        )
      )
      .subscribe((result: string[]) => {
        expect(result).toEqual(expectedResult);
        done();
      });
  }, 10000);

  it('should complete after emit', (done: jest.DoneCallback) => {
    const input: Nullable<string>[] = ['leading-marker', null, 'trailing-marker'];

    const nextOccurred$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    const errorOccurred$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    const completeOccurred$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    combineLatest([nextOccurred$, errorOccurred$, completeOccurred$])
      .pipe(
        map(([nextOccurred, errorOccurred, completeOccurred]) => {
          return nextOccurred && !errorOccurred && completeOccurred;
        }),
        filterTruthy()
      )
      .subscribe((isExpectedResult: boolean) => {
        expect(isExpectedResult).toBeTruthy();
        done();
      });

    const onComplete: VoidFunction = () => {
      expect(onComplete).toHaveBeenCalled();
      done();
    };

    from(input)
      .pipe(
        bufferFromTo(
          (inputItem: Nullable<string>) => inputItem === 'leading-marker',
          (inputItem: Nullable<string>) => inputItem === 'trailing-marker'
        )
      )
      .subscribe(
        () => {
          nextOccurred$.next(true);
        },
        () => {
          errorOccurred$.next(true);
        },
        () => {
          completeOccurred$.next(true);
        }
      );
  }, 10000);

  it('should emit empty array in case of combined marker', (done: jest.DoneCallback) => {
    const input: string[] = ['combined-marker'];

    from(input)
      .pipe(
        bufferFromTo(
          (inputItem: string) => inputItem === 'combined-marker',
          (inputItem: string) => inputItem === 'combined-marker'
        )
      )
      .subscribe((result: string[]) => {
        expect(result).toEqual([]);
        done();
      });
  }, 10000);
});
