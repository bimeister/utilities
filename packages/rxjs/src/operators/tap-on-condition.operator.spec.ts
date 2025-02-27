import { from, Observable } from 'rxjs';
import { tapOnCondition } from './tap-on-condition.operator';

describe('tap-on-condition.operator.ts', () => {
  it('should invoke trueCallback when condition is true', () => {
    const input$: Observable<number> = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const callbacks: number[] = [];

    input$
      .pipe(
        tapOnCondition(
          (value: number) => value % 2 === 0,
          (value: number) => callbacks.push(value)
        )
      )
      .subscribe()
      .unsubscribe();

    expect(callbacks).toEqual([2, 4, 6, 8, 10]);
  });

  it('should invoke falseCallback when condition is false', () => {
    const input$: Observable<number> = from([1, 2, 3, 4, 5]);
    const trueCallbacks: number[] = [];
    const falseCallbacks: number[] = [];

    input$
      .pipe(
        tapOnCondition(
          (value: number) => value % 2 === 0,
          (value: number) => trueCallbacks.push(value),
          (value: number) => falseCallbacks.push(value)
        )
      )
      .subscribe()
      .unsubscribe();

    expect(trueCallbacks).toEqual([2, 4]);
    expect(falseCallbacks).toEqual([1, 3, 5]);
  });

  it('should invoke trueCallback for boolean condition true', () => {
    const input$: Observable<number> = from([1, 2, 3, 4, 5]);
    const callbacks: number[] = [];

    input$
      .pipe(tapOnCondition(true, (value: number) => callbacks.push(value)))
      .subscribe()
      .unsubscribe();

    expect(callbacks).toEqual([1, 2, 3, 4, 5]);
  });

  it('should not invoke falseCallback for boolean condition true', () => {
    const input$: Observable<number> = from([1, 2, 3, 4, 5]);
    const callbacks: number[] = [];

    input$
      .pipe(
        tapOnCondition(
          true,
          (value: number) => callbacks.push(value),
          () => callbacks.push(-1)
        )
      )
      .subscribe()
      .unsubscribe();

    expect(callbacks).toEqual([1, 2, 3, 4, 5]);
  });

  it('should not invoke any callback when observable is empty', () => {
    const input$: Observable<number> = from([]);
    const callbacks: number[] = [];

    input$
      .pipe(
        tapOnCondition(
          (value: number) => value % 2 === 0,
          (value: number) => callbacks.push(value),
          () => callbacks.push(-1)
        )
      )
      .subscribe()
      .unsubscribe();

    expect(callbacks).toEqual([]);
  });
});
