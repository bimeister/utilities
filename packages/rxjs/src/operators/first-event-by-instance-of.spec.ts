import { from, Observable } from 'rxjs';
import { firstEventByInstanceOf } from './first-event-by-instance-of.operator';

class SomeClassA {
  public readonly name: string = 'Some name A';
}

class SomeClassB {
  public readonly name: string = 'Some name B';
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
      }
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
      }
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
      }
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
      }
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
      }
    });
  });
});
