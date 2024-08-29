import { from, Observable } from 'rxjs';
import { filterByInstanceOf } from './filter-by-instance-of.operator';

class Base {}

class SomeClassA extends Base {
  public readonly name: string = 'Some name A';
}

class SomeClassB extends Base {
  public readonly name: string = 'Some name B';
}

class SomeClassC extends Base {
  public readonly name: string = 'Some name C';
}

class SomeClassD extends Base {
  public readonly name: string = 'Some name D';
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

  it('should emit arrays containing valid instances', () => {
    const input$: Observable<Base[]> = from([
      [new SomeClassA(), new SomeClassB()],
      [new SomeClassC(), new SomeClassD()],
    ]);

    const emits: unknown[] = [];

    input$
      .pipe(filterByInstanceOf(SomeClassD))
      .subscribe((output: Base[]): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toEqual([[new SomeClassC(), new SomeClassD()]]);
  });

  it('should emit arrays containing at least one valid instance', () => {
    const input$: Observable<Base[]> = from([
      [new SomeClassA(), new SomeClassB()],
      [new SomeClassC(), new SomeClassD()],
      [new SomeClassA(), new SomeClassD()],
    ]);

    const emits: unknown[] = [];

    input$
      .pipe(filterByInstanceOf(SomeClassD))
      .subscribe((output: Base[]): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toEqual([
      [new SomeClassC(), new SomeClassD()],
      [new SomeClassA(), new SomeClassD()],
    ]);
  });

  it('should not emit arrays without any valid instance', () => {
    const input$: Observable<Base[]> = from([[new SomeClassA(), new SomeClassB()], [new SomeClassC()]]);

    const emits: unknown[] = [];

    input$
      .pipe(filterByInstanceOf(SomeClassD))
      .subscribe((output: Base[]): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toEqual([]);
  });

  it('should emit empty arrays when applicable', () => {
    const input$: Observable<Base[]> = from([[], [new SomeClassA()], [new SomeClassB(), new SomeClassD()]]);

    const emits: unknown[] = [];

    input$
      .pipe(filterByInstanceOf(SomeClassD))
      .subscribe((output: Base[]): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toEqual([[new SomeClassB(), new SomeClassD()]]);
  });
});
