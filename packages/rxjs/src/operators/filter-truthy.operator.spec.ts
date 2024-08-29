import { from, Observable } from 'rxjs';
import { filterTruthy } from './filter-truthy.operator';

describe('filter-truthy.operator.ts', () => {
  it('should filter out falsy values', () => {
    const input$: Observable<unknown> = from([1, 'string', false, 0, null, undefined, true]);

    const emits: unknown[] = [];

    input$.pipe(filterTruthy()).subscribe((output: unknown): void => {
      emits.push(output);
    });

    expect(emits).toEqual([1, 'string', true]);
  });

  it('should correctly handle numbers, filtering out falsy ones', () => {
    const input$: Observable<number | null | undefined> = from([0, 1, 2, 3, null, undefined]);

    const emits: number[] = [];

    input$.pipe(filterTruthy()).subscribe((output: number): void => {
      emits.push(output);
    });

    expect(emits).toEqual([1, 2, 3]);
  });

  it('should work with strings, filtering out empty strings', () => {
    const input$: Observable<string | null | undefined> = from(['', 'hello', null, 'world', undefined]);

    const emits: string[] = [];

    input$.pipe(filterTruthy()).subscribe((output: string): void => {
      emits.push(output);
    });

    expect(emits).toEqual(['hello', 'world']);
  });

  it('should filter out null and undefined values', () => {
    const input$: Observable<string | null | undefined> = from([null, undefined, 'defined']);

    const emits: string[] = [];

    input$.pipe(filterTruthy()).subscribe((output: string): void => {
      emits.push(output);
    });

    expect(emits).toEqual(['defined']);
  });

  it('should work with complex objects, filtering out falsy ones', () => {
    interface Item {
      id: number;
      name: string;
    }

    const input$: Observable<Item | null | undefined> = from([
      { id: 1, name: 'Item 1' },
      null,
      { id: 2, name: 'Item 2' },
      undefined,
    ]);

    const emits: Item[] = [];

    input$.pipe(filterTruthy()).subscribe((output: Item): void => {
      emits.push(output);
    });

    expect(emits).toEqual([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ]);
  });
});
