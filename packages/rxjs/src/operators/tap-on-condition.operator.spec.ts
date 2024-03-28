import { from, Observable } from 'rxjs';
import { tapOnCondition } from './tap-on-condition.operator';

describe('tap-on-condition.operator.ts', () => {
  it('should invoke callback (using value from stream) when condition is true', () => {
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

  it('should invoke callback (not using value from stream) when condition is true', () => {
    const input$: Observable<number> = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    const callbacks: number[] = [];

    input$
      .pipe(
        tapOnCondition(
          (value: number) => value % 2 === 0,
          () => callbacks.push(1)
        )
      )
      .subscribe()
      .unsubscribe();

    expect(callbacks).toEqual([1, 1, 1, 1, 1]);
  });

  it('should invoke callback when condition is true', () => {
    const input$: Observable<number> = from([1, 2, 3, 4, 5]);

    const callbacks: number[] = [];

    input$
      .pipe(tapOnCondition(true, () => callbacks.push(1)))
      .subscribe()
      .unsubscribe();

    expect(callbacks).toEqual([1, 1, 1, 1, 1]);
  });

  it('should not invoke callback when condition is false', () => {
    const input$: Observable<number> = from([1, 2, 3, 4, 5]);

    const callbacks: number[] = [];

    input$
      .pipe(
        tapOnCondition(
          (value: number) => value > 10,
          (value: number) => callbacks.push(value)
        )
      )
      .subscribe()
      .unsubscribe();

    expect(callbacks).toEqual([]);
  });

  it('should not invoke callback when the source observable is empty', () => {
    const input$: Observable<number> = from([]);

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

    expect(callbacks).toEqual([]);
  });
});
