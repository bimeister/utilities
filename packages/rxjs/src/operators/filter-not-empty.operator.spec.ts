import { filterNotEmpty } from '@bimeister/utilities.rxjs';
import { from, Observable } from 'rxjs';

describe('filter-not-empty.operator.ts', () => {
  it('should return not empty values', () => {
    const input$: Observable<unknown> = from([null, undefined, '', 'string']);

    const emits: unknown[] = [];

    input$
      .pipe(filterNotEmpty())
      .subscribe((output: unknown): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toEqual(['string']);
  });
});
