import { BehaviorSubject, merge, Observable, of, timer } from 'rxjs';
import { mapTo, take, withLatestFrom } from 'rxjs/operators';

import { firstNotNil } from './first-not-nil.operator';

describe('first-not-nil.operator.ts', () => {
  it('should emit valid value only once', done => {
    const input$: Observable<number> = merge(...[of(undefined), of(1), of(2)]);
    const emits: number[] = [];

    input$.pipe(firstNotNil()).subscribe({
      next: (output: number): void => {
        emits.push(output);
      }
    });

    timer(9000)
      .pipe(take(1), mapTo(emits))
      .subscribe((emittedValues: number[]) => {
        expect(emittedValues).toEqual([1]);
        done();
      });
  }, 10000);

  it('should complete after emit', done => {
    const input$: Observable<number> = merge(...[of(undefined), of(1), of(2)]);
    const emits: number[] = [];
    const isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    input$.pipe(firstNotNil()).subscribe({
      next: (output: number): void => {
        emits.push(output);
      },
      complete: (): void => isCompleted$.next(true)
    });

    timer(9000)
      .pipe(take(1), mapTo(emits), withLatestFrom(isCompleted$))
      .subscribe(([emittedValues, isCompleted]: [number[], boolean]) => {
        expect(emittedValues).not.toHaveLength(0);
        expect(isCompleted).toBeTruthy();
        done();
      });
  }, 10000);
});
