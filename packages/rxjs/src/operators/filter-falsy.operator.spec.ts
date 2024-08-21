import { from, Observable } from 'rxjs';
import { filterFalsy } from './filter-falsy.operator';

describe('filter-falsy.operator.ts', () => {
  it('should filter out truthy values', () => {
    const input$: Observable<unknown> = from([1, 'string', false, null, undefined, 0, true]);

    const emits: unknown[] = [];

    input$.pipe(filterFalsy()).subscribe((output: unknown): void => {
      emits.push(output);
    });

    expect(emits).toEqual([false, null, undefined, 0]);
  });

  it('should correctly filter out truthy numbers', () => {
    const input$: Observable<number | null | undefined> = from([0, 1, 2, 3, null, undefined]);

    const emits: (number | null | undefined)[] = [];

    input$.pipe(filterFalsy()).subscribe((output: number | null | undefined): void => {
      emits.push(output);
    });

    expect(emits).toEqual([0, null, undefined]);
  });

  it('should correctly filter out truthy strings', () => {
    const input$: Observable<string | null | undefined> = from(['', 'hello', null, 'world', undefined]);

    const emits: (string | null | undefined)[] = [];

    input$.pipe(filterFalsy()).subscribe((output: string | null | undefined): void => {
      emits.push(output);
    });

    expect(emits).toEqual(['', null, undefined]);
  });

  it('should filter out truthy objects', () => {
    interface Item {
      id: number;
      name: string;
    }

    const input$: Observable<Item | null | undefined> = from([
      { id: 1, name: 'Item 1' },
      null,
      { id: 2, name: 'Item 2' },
      undefined
    ]);

    const emits: (null | undefined)[] = [];

    input$.pipe(filterFalsy()).subscribe((output: null | undefined): void => {
      emits.push(output);
    });

    expect(emits).toEqual([null, undefined]);
  });

  it('should filter out `NaN` as a falsy value', () => {
    const input$: Observable<number> = from([NaN, 1, 0, 3, NaN]);

    const emits: number[] = [];

    input$.pipe(filterFalsy()).subscribe((output: number): void => {
      emits.push(output);
    });

    expect(emits).toEqual([NaN, 0, NaN]);
  });
});
