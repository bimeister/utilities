import { isNil } from 'packages/common';
import { Nullable } from 'packages/types';
import { BehaviorSubject, merge, Observable, of, timer } from 'rxjs';
import { switchMapTo, take } from 'rxjs/operators';
import { concatJoin } from './../functions/concat-join.function';
import { filterNotNil } from './filter-not-nil.operator';

describe('filter-not-nil.operator.ts', () => {
  it('should not pass null and undefined', (done: jest.DoneCallback) => {
    const emited$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    merge(of(null), of(undefined))
      .pipe(filterNotNil())
      .subscribe(() => emited$.next(true));

    timer(9000)
      .pipe(take(1), switchMapTo(emited$))
      .subscribe((emited: boolean) => {
        expect(emited).toBeFalsy();
        done();
      });
  }, 10000);

  it('should pass every not null value', (done: jest.DoneCallback) => {
    const input: Nullable<number>[] = [1, 2, 3, undefined, undefined, 6, 7, 8, undefined, 10];
    const input$: Observable<number>[] = input.map((value: number | undefined) =>
      of(value).pipe(take(1), filterNotNil())
    );

    concatJoin(...input$).subscribe({
      next: (output: number[]): void => {
        expect(output).toEqual(input.filter((value: number) => !isNil(value)));
        done();
      }
    });
  }, 10000);
});
