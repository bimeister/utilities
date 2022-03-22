import { from, Observable } from 'rxjs';
import { filterByInstanceOf } from './filter-by-instance-of.operator';

class SomeClass {
  public readonly name: string = 'Some name';
}

describe('filter-by-instance-of.operator.ts', () => {
  it('should emit valid value only once', () => {
    const input$: Observable<unknown> = from([1, 'string', { name: 'Some name' }, new SomeClass()]);

    const emits: unknown[] = [];

    input$
      .pipe(filterByInstanceOf(SomeClass))
      .subscribe((output: SomeClass): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toEqual([new SomeClass()]);
  });
});
