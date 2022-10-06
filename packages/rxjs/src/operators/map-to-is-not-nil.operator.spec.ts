import { from, Observable } from 'rxjs';
import { mapToIsNotNil } from '@bimeister/utilities.rxjs';

describe('map-to-is-not-nil.operator.spec.ts', () => {
  it('should values map to is not nil', () => {
    const input$: Observable<unknown> = from([null, '', 0, undefined]);

    const emits: unknown[] = [];

    input$
      .pipe(mapToIsNotNil())
      .subscribe((output: unknown): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toEqual([false, true, true, false]);
  });
});
