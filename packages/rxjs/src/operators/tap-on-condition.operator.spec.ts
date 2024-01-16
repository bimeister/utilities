import { from, Observable } from 'rxjs';
import { tapOnCondition } from './tap-on-condition.operator';

describe('tap-on-condition.operator.ts', () => {
  it('should not invoke callback when condition is false', () => {
    const input$: Observable<unknown> = from([1, 'string', { name: 'Some name' }]);

    const callbacks: number[] = [];

    input$
      .pipe(tapOnCondition(false, () => callbacks.push(1)))
      .subscribe()
      .unsubscribe();

    expect(callbacks).toEqual([]);
  });

  it('should invoke callback multiple times when condition is true', () => {
    const input$: Observable<unknown> = from([1, 'string', { name: 'Some name' }]);

    const callbacks: number[] = [];

    input$
      .pipe(tapOnCondition(true, () => callbacks.push(1)))
      .subscribe()
      .unsubscribe();

    expect(callbacks).toEqual([1, 1, 1]);
  });

  it('should not invoke callback when the source observable is empty', () => {
    const input$: Observable<unknown> = from([]);

    const callbacks: number[] = [];

    input$
      .pipe(tapOnCondition(true, () => callbacks.push(1)))
      .subscribe()
      .unsubscribe();

    expect(callbacks).toEqual([]);
  });
});
