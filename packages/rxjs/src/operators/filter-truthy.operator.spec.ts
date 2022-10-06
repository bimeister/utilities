import { from, Observable } from "rxjs";
import { filterTruthy } from "@bimeister/utilities.rxjs";

describe('filter-truth.operator.ts', () => {
  it('should filter falsy value', () => {
    const input$: Observable<unknown> = from([1, 'string', false]);

    const emits: unknown[] = [];

    input$
      .pipe(filterTruthy())
      .subscribe((output: unknown): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toEqual([1, 'string']);
  });
});
