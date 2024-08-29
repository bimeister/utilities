import { from, Observable } from 'rxjs';
import { mapToIsEmpty } from './map-to-is-empty.operator';

describe('map-to-is-empty.operator.spec.ts', () => {
  it('should values map to is empty', () => {
    const input$: Observable<unknown> = from([
      null,
      '',
      0,
      undefined,
      [],
      new Map(),
      new Set(),
      'hello',
      {},
      { id: 1 },
      new Map<number, number>([[1, 1]]),
      new Set<number>([1]),
    ]);

    const emits: unknown[] = [];

    input$
      .pipe(mapToIsEmpty())
      .subscribe((output: unknown): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toEqual([true, true, false, true, true, true, true, false, true, false, false, false]);
  });
});
