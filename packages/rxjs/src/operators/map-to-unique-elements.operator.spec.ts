import { Observable, of } from 'rxjs';
import { mapToUniqueElements } from '@bimeister/utilities.rxjs';

describe('map-to-unique-elements.operator.spec.ts', () => {
  it('should return unique elements', () => {
    const input$: Observable<object[]> = of([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 2 }]);

    const emits: unknown[] = [];

    input$
      .pipe(mapToUniqueElements('id' as any as never))
      .subscribe((output: unknown): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toEqual([[{ id: 1 }, { id: 2 }, { id: 3 }]]);
  });
});
