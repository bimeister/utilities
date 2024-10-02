import { from, Observable } from 'rxjs';
import { firstEventByInstanceOf } from './first-event-by-instance-of.operator';

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

describe('first-event-by-instance-of.operator.ts', () => {
  it('should emit the first valid value and complete for single type', (done: jest.DoneCallback) => {
    const input$: Observable<unknown> = from([1, 'string', { name: 'Some name' }, new SomeClassA()]);

    const emits: unknown[] = [];

    input$.pipe(firstEventByInstanceOf(SomeClassA)).subscribe({
      next: (output: SomeClassA) => {
        emits.push(output);
      },
      complete: () => {
        expect(emits).toEqual([new SomeClassA()]);
        done();
      },
    });
  });

  it('should emit the first valid value and complete for multiple types', (done: jest.DoneCallback) => {
    const input$: Observable<unknown> = from([1, 'string', { name: 'Some name' }, new SomeClassA(), new SomeClassB()]);

    const emits: unknown[] = [];

    input$.pipe(firstEventByInstanceOf(SomeClassA, SomeClassB)).subscribe({
      next: (output: SomeClassA | SomeClassB) => {
        emits.push(output);
      },
      complete: () => {
        expect(emits).toEqual([new SomeClassA()]);
        done();
      },
    });
  });

  it('should emit the first valid value and complete for one of multiple types', (done: jest.DoneCallback) => {
    const input$: Observable<unknown> = from([1, 'string', { name: 'Some name' }, new SomeClassB()]);

    const emits: unknown[] = [];

    input$.pipe(firstEventByInstanceOf(SomeClassA, SomeClassB)).subscribe({
      next: (output: SomeClassA | SomeClassB) => {
        emits.push(output);
      },
      complete: () => {
        expect(emits).toEqual([new SomeClassB()]);
        done();
      },
    });
  });

  it('should not emit any value if no matching type is found and complete', (done: jest.DoneCallback) => {
    const input$: Observable<unknown> = from([1, 'string', { name: 'Some name' }]);

    const emits: unknown[] = [];

    input$.pipe(firstEventByInstanceOf(SomeClassA, SomeClassB)).subscribe({
      next: (output: SomeClassA | SomeClassB) => {
        emits.push(output);
      },
      complete: () => {
        expect(emits).toEqual([]);
        done();
      },
    });
  });

  it('should complete after emitting the first valid value for multiple types', (done: jest.DoneCallback) => {
    const input$: Observable<unknown> = from([1, 'string', { name: 'Some name' }, new SomeClassB(), new SomeClassA()]);

    const emits: unknown[] = [];

    input$.pipe(firstEventByInstanceOf(SomeClassA, SomeClassB)).subscribe({
      next: (output: SomeClassA | SomeClassB) => {
        emits.push(output);
      },
      complete: () => {
        expect(emits).toEqual([new SomeClassB()]);
        done();
      },
    });
  });

  it('should emit valid value for arrays of instances and complete', (done: jest.DoneCallback) => {
    const input$: Observable<Base[]> = from([
      [new SomeClassA(), new SomeClassB()],
      [new SomeClassC(), new SomeClassD()],
    ]);

    const emits: unknown[] = [];

    input$.pipe(firstEventByInstanceOf(SomeClassD)).subscribe({
      next: (output: Base[]) => {
        emits.push(output);
      },
      complete: () => {
        expect(emits).toEqual([[new SomeClassC(), new SomeClassD()]]);
        done();
      },
    });
  });
});
