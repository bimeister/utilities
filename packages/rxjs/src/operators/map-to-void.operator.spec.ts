import { Observable, of } from 'rxjs';
import { mapToVoid } from '@bimeister/utilities.rxjs';
import { map } from 'rxjs/operators';
import { VOID } from '@bimeister/utilities.constants';

describe('map-to-void.operator.spec.ts', () => {
  it('should return elements with type void', () => {
    const input$: Observable<number[]> = of([1, 2, 3]);

    input$.pipe(
      mapToVoid(),
      map((el: unknown) => expect(el).toBe(VOID))
    );
  });
});
