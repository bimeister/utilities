import { from, Observable } from 'rxjs';
import { filterFalsy } from '@bimeister/utilities.rxjs';

describe('filter-falsy.operator.ts', () => {
  it('should filter truth value', () => {
    const input$: Observable<unknown> = from([1, 'string', false]);

    const emits: unknown[] = [];

    input$
      .pipe(filterFalsy())
      .subscribe((output: unknown): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toEqual([false]);
  });
});
