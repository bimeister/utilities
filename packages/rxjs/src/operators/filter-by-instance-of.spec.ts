import { from, Observable } from 'rxjs';
import { filterByInstanceOf } from './filter-by-instance-of.operator';

class SomeClassA {
  public readonly name: string = 'Some name A';
}

class SomeClassB {
  public readonly name: string = 'Some name B';
}

describe('filter-by-instance-of.operator.ts', () => {
  it('should emit valid value only once for single type', () => {
    const input$: Observable<unknown> = from([1, 'string', { name: 'Some name' }, new SomeClassA()]);

    const emits: unknown[] = [];

    input$
      .pipe(filterByInstanceOf(SomeClassA))
      .subscribe((output: SomeClassA): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toEqual([new SomeClassA()]);
  });

  it('should emit valid value only once for multiple types', () => {
    const input$: Observable<unknown> = from([1, 'string', { name: 'Some name' }, new SomeClassA(), new SomeClassB()]);

    const emits: unknown[] = [];

    input$
      .pipe(filterByInstanceOf(SomeClassA, SomeClassB))
      .subscribe((output: SomeClassA | SomeClassB): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toEqual([new SomeClassA(), new SomeClassB()]);
  });

  it('should emit valid value only once for one of multiple types', () => {
    const input$: Observable<unknown> = from([1, 'string', { name: 'Some name' }, new SomeClassB()]);

    const emits: unknown[] = [];

    input$
      .pipe(filterByInstanceOf(SomeClassA, SomeClassB))
      .subscribe((output: SomeClassA | SomeClassB): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toContainEqual(new SomeClassB());
  });

  it('should not emit any value for single type', () => {
    const input$: Observable<unknown> = from([1, 'string', { name: 'Some name' }, new SomeClassB()]);

    const emits: unknown[] = [];

    input$
      .pipe(filterByInstanceOf(SomeClassA))
      .subscribe((output: SomeClassA): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toEqual([]);
  });

  it('should not emit any value for multiple types', () => {
    const input$: Observable<unknown> = from([1, 'string', { name: 'Some name' }, new SomeClassB()]);

    const emits: unknown[] = [];

    input$
      .pipe(filterByInstanceOf(SomeClassA, SomeClassB))
      .subscribe((output: SomeClassA | SomeClassB): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toEqual([new SomeClassB()]);
  });
});
