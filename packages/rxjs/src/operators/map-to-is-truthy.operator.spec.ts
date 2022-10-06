import { from, Observable } from 'rxjs';
import { mapToIsTruthy } from '@bimeister/utilities.rxjs';

describe('map-to-is-truthy.operator.spec.ts', () => {
  it('should values map to is true', () => {
    const input$: Observable<unknown> = from([1, '', 0, 'string']);

    const emits: unknown[] = [];

    input$
      .pipe(mapToIsTruthy())
      .subscribe((output: unknown): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toEqual([true, false, false, true]);
  });
});
