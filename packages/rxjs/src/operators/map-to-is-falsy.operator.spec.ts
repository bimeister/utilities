import { mapToIsFalsy } from '@bimeister/utilities.rxjs';
import { from, Observable } from 'rxjs';

describe('map-to-is-falsy.operator.spec.ts', () => {
  it('should values map to is falsy', () => {
    const input$: Observable<unknown> = from([1, '', 0, 'string']);

    const emits: unknown[] = [];

    input$
      .pipe(mapToIsFalsy())
      .subscribe((output: unknown): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toEqual([false, true, true, false]);
  });
});
