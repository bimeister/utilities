import { Observable, of } from 'rxjs';
import { mapToSortedByProperty } from '@bimeister/utilities.rxjs';

describe('map-to-sorted-by-property.operator.spec.ts', () => {
  it('123', () => {
    const unsortedObjects$: Observable<object[]> = of([
      { word: 'lorem' },
      { word: 'ipsum' },
      { word: 'dolor' },
      { word: 'sit' },
      { word: 'amen' },
      { word: 'consenter' },
      { word: 'advising' },
      { word: 'elite' }
    ]);

    const sortedObjects: object[] = [
      { word: 'advising' },
      { word: 'amen' },
      { word: 'consenter' },
      { word: 'dolor' },
      { word: 'elite' },
      { word: 'ipsum' },
      { word: 'lorem' },
      { word: 'sit' }
    ];

    const emits: unknown[] = [];

    unsortedObjects$
      .pipe(mapToSortedByProperty('word' as any as never))
      .subscribe((output: unknown): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toEqual([sortedObjects]);
  });
});
