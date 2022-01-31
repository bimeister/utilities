import { getShuffledArray } from '@bimeister/utilities.common';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { switchMapTo, take, withLatestFrom } from 'rxjs/operators';
import { concatJoin } from './concat-join.function';

describe('concat-join.function.ts', () => {
  it('should never emit if nothing is passed', (done: jest.DoneCallback) => {
    const emitted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    concatJoin().subscribe(() => emitted$.next(true));

    timer(9000)
      .pipe(take(1), switchMapTo(emitted$))
      .subscribe((emitted: boolean) => {
        expect(emitted).toBeFalsy();
        done();
      });
  }, 10000);

  it('should emit items in sequence they passed', (done: jest.DoneCallback) => {
    const input: number[] = getShuffledArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const input$: Observable<number>[] = input.map((value: number) => of(value).pipe(take(1)));

    concatJoin(...input$).subscribe((output: number[]) => expect(output).toEqual(input));

    timer(9000)
      .pipe(take(1))
      .subscribe(() => {
        done();
      });
  }, 10000);

  it('should be completed after all emits', (done: jest.DoneCallback) => {
    const input: number[] = getShuffledArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const input$: Observable<number>[] = input.map((value: number) => of(value).pipe(take(1)));
    const isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    const emitted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    concatJoin(...input$).subscribe({
      next: (): void => emitted$.next(true),
      complete: (): void => isCompleted$.next(true)
    });

    timer(9000)
      .pipe(take(1), switchMapTo(isCompleted$), withLatestFrom(emitted$))
      .subscribe(([isCompleted, emitted]: [boolean, boolean]) => {
        expect(isCompleted).toBeTruthy();
        expect(emitted).toBeTruthy();
        done();
      });
  }, 10000);
});
