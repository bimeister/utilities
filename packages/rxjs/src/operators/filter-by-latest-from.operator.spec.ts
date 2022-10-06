import { from, Observable } from 'rxjs';
import { filterByLatestFrom } from '@bimeister/utilities.rxjs';

describe('filter-by-latest-from.operator.ts', () => {
  it('should filter truth value', () => {
    const source$: Observable<unknown> = from(['string', '', 0]);
    const observable$: Observable<unknown> = from(['']);

    const emits: unknown[] = [];

    source$
      .pipe(filterByLatestFrom(observable$, () => true))
      .subscribe((output: unknown): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toEqual(['string', '', 0]);
  });
});
