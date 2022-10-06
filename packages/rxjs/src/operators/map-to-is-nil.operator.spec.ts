import { from, Observable } from 'rxjs';
import { mapToIsNil } from '@bimeister/utilities.rxjs';

describe('map-to-is-nil.operator.spec.ts', () => {
  it('should values map to is nil', () => {
    const input$: Observable<unknown> = from([null, '', 0, undefined]);

    const emits: unknown[] = [];

    input$
      .pipe(mapToIsNil())
      .subscribe((output: unknown): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toEqual([true, false, false, true]);
  });
});
