import { from, type Observable } from 'rxjs';
import { tapOnInstanceOf } from './tap-on-instance-of.operator';

class SomeClassA {
  public readonly name: string = 'Some name A';
}

class SomeClassB {
  public readonly name: string = 'Some name B';
}

class SomeClassC {
  public readonly name: string = 'Some name C';
}

class SomeClassD {
  public readonly name: string = 'Some name D';
  constructor(public readonly userName: string) {}
}

describe('tap-on-instance-of.operator.ts', () => {
  it('should invoke callback for valid value multiple times for single type', () => {
    const input$: Observable<unknown> = from([
      1,
      'string',
      { name: 'Some name' },
      new SomeClassD('admin'),
      new SomeClassD('admin1'),
      new SomeClassA(),
    ]);

    const callbacks: string[] = [];

    input$
      .pipe(tapOnInstanceOf(SomeClassD, ({ userName }: SomeClassD) => callbacks.push(userName)))
      .subscribe()
      .unsubscribe();

    expect(callbacks).toEqual(['admin', 'admin1']);
  });

  it('should invoke callback for valid value only once for multiple types', () => {
    const input$: Observable<unknown> = from([1, 'string', { name: 'Some name' }, new SomeClassA(), new SomeClassB()]);

    const callbacks: number[] = [];

    input$
      .pipe(tapOnInstanceOf(SomeClassA, () => callbacks.push(1)))
      .subscribe()
      .unsubscribe();

    expect(callbacks).toEqual([1]);
  });

  it('should invoke callback for valid value twice for multiple types', () => {
    const input$: Observable<unknown> = from([
      1,
      'string',
      { name: 'Some name' },
      new SomeClassA(),
      new SomeClassB(),
      new SomeClassC(),
    ]);

    const callbacks: number[] = [];

    input$
      .pipe(tapOnInstanceOf([SomeClassA, SomeClassC], () => callbacks.push(1)))
      .subscribe()
      .unsubscribe();

    expect(callbacks).toEqual([1, 1]);
  });

  it('should not invoke callback for any value for single type', () => {
    const input$: Observable<unknown> = from([1, 'string', { name: 'Some name' }, new SomeClassB()]);

    const callbacks: number[] = [];

    input$
      .pipe(tapOnInstanceOf(SomeClassA, () => callbacks.push(1)))
      .subscribe()
      .unsubscribe();

    expect(callbacks).toEqual([]);
  });
});
