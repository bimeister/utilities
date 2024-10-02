import { isEqual } from './is-equal.function';

describe('is-equal.function.ts', () => {
  it('should be true if objects are equal', () => {
    const a: unknown = { property: 'property' };
    const b: unknown = { property: 'property' };
    expect(isEqual(a, b)).toBe(true);
  });

  it('should be false if objects are not equal', () => {
    const a: unknown = { propertyOne: true };
    const b: unknown = { propertyTwo: false };
    expect(isEqual(a, b)).toBe(false);
  });

  it('should be true if strings are equal', () => {
    const a: string = 'string';
    const b: string = 'string';
    expect(isEqual(a, b)).toBe(true);
  });

  it('should be false if strings are not equal', () => {
    const a: string = 'string';
    const b: string = 'string1';
    expect(isEqual(a, b)).toBe(false);
  });

  it('should be true if numbers are equal', () => {
    const a: number = 5;
    const b: number = 5;
    expect(isEqual(a, b)).toBe(true);
  });

  it('should be false if numbers are not equal', () => {
    const a: number = 5;
    const b: number = 4;
    expect(isEqual(a, b)).toBe(false);
  });

  it('should be true if arrays of strings are equal', () => {
    const a: string[] = ['1', '2', '3'];
    const b: string[] = ['1', '2', '3'];
    expect(isEqual(a, b)).toBe(true);
  });

  it('should be false if arrays of strings are not equal', () => {
    const a: string[] = ['1', '2', '3'];
    const b: string[] = ['1', '2', '3', '4'];
    expect(isEqual(a, b)).toBe(false);
  });

  it('should be true if arrays of numbers are equal', () => {
    const a: number[] = [1, 2, 3];
    const b: number[] = [1, 2, 3];
    expect(isEqual(a, b)).toBe(true);
  });

  it('should be false if arrays of numbers are not equal', () => {
    const a: number[] = [1, 2, 3];
    const b: number[] = [1, 2, 3, 4];
    expect(isEqual(a, b)).toBe(false);
  });

  it('should be true if arrays of objects are equal', () => {
    const a: unknown[] = Array.from(Array(10).keys()).map((index: number) => ({ id: index, name: index }));
    const b: unknown[] = Array.from(Array(10).keys()).map((index: number) => ({ id: index, name: index }));
    expect(isEqual(a, b)).toBe(true);
  });

  it('should be false if arrays of objects are not equal', () => {
    const a: unknown[] = Array.from(Array(10).keys()).map((index: number) => ({ id: index, name: index }));
    const b: unknown[] = Array.from(Array(15).keys()).map((index: number) => ({ id: index, name: index }));
    expect(isEqual(a, b)).toBe(false);
  });

  it('should be true if arrays of numbers are equal when sorted with a custom predicate', () => {
    const a: number[] = [3, 1, 2];
    const b: number[] = [1, 2, 3];
    const sortPredicate: (x: number, y: number) => number = (x: number, y: number) => x - y;
    expect(isEqual(a, b, sortPredicate)).toBe(true);
  });

  it('should be false if arrays of numbers are not equal even after sorting with a custom predicate', () => {
    const a: number[] = [3, 1, 2];
    const b: number[] = [1, 2, 4];
    const sortPredicate: (x: number, y: number) => number = (x: number, y: number) => x - y;
    expect(isEqual(a, b, sortPredicate)).toBe(false);
  });

  it('should be true if sets of strings are equal', () => {
    const a: Set<string> = new Set<string>(['1', '2', '3']);
    const b: Set<string> = new Set<string>(['1', '2', '3']);
    expect(isEqual(a, b)).toBe(true);
  });

  it('should be false if sets of strings are not equal', () => {
    const a: Set<string> = new Set<string>(['1', '2', '3']);
    const b: Set<string> = new Set<string>(['1', '2', '3', '4']);
    expect(isEqual(a, b)).toBe(false);
  });

  it('should be true if sets of numbers are equal', () => {
    const a: Set<number> = new Set<number>([1, 2, 3]);
    const b: Set<number> = new Set<number>([1, 2, 3]);
    expect(isEqual(a, b)).toBe(true);
  });

  it('should be false if sets of numbers are not equal', () => {
    const a: Set<number> = new Set<number>([1, 2, 3]);
    const b: Set<number> = new Set<number>([1, 2, 3, 4]);
    expect(isEqual(a, b)).toBe(false);
  });

  it('should be true if maps of strings are equal', () => {
    const a: Map<string, number> = new Map<string, number>([
      ['1', 1],
      ['2', 2],
      ['3', 3],
    ]);
    const b: Map<string, number> = new Map<string, number>([
      ['1', 1],
      ['2', 2],
      ['3', 3],
    ]);
    expect(isEqual(a, b)).toBe(true);
  });

  it('should be false if maps of strings are not equal', () => {
    const a: Map<string, number> = new Map<string, number>([
      ['1', 1],
      ['2', 2],
      ['3', 3],
    ]);
    const b: Map<string, number> = new Map<string, number>([
      ['1', 1],
      ['2', 2],
      ['3', 4],
    ]);
    expect(isEqual(a, b)).toBe(false);
  });

  it('should be true if maps of objects are equal', () => {
    const a: Map<string, unknown> = new Map<string, unknown>([
      ['1', { id: 1 }],
      ['2', { id: 2 }],
      ['3', { id: 3 }],
    ]);
    const b: Map<string, unknown> = new Map<string, unknown>([
      ['1', { id: 1 }],
      ['2', { id: 2 }],
      ['3', { id: 3 }],
    ]);
    expect(isEqual(a, b)).toBe(true);
  });

  it('should be false if maps of objects are not equal', () => {
    const a: Map<string, unknown> = new Map<string, unknown>([
      ['1', { id: 1 }],
      ['2', { id: 2 }],
      ['3', { id: 3 }],
    ]);
    const b: Map<string, unknown> = new Map<string, unknown>([
      ['1', { id: 1 }],
      ['2', { id: 2 }],
      ['3', { id: 4 }],
    ]);
    expect(isEqual(a, b)).toBe(false);
  });

  it('should be true if strings are equal case-insensitively when caseSensitive is false', () => {
    const a: string = 'Hello';
    const b: string = 'hello';
    expect(isEqual(a, b, false)).toBe(true);
  });

  it('should be false if strings are not equal case-insensitively when caseSensitive is false', () => {
    const a: string = 'Hello';
    const b: string = 'World';
    expect(isEqual(a, b, false)).toBe(false);
  });

  it('should be false if strings are equal but case-sensitive comparison is used (default behavior)', () => {
    const a: string = 'Hello';
    const b: string = 'hello';
    expect(isEqual(a, b)).toBe(false);
  });

  it('should be false if strings are equal but case-sensitive comparison is explicitly set', () => {
    const a: string = 'Hello';
    const b: string = 'hello';
    expect(isEqual(a, b, true)).toBe(false);
  });

  it('should be false if strings are equal but case-sensitive comparison is used', () => {
    const a: string = 'Hello';
    const b: string = 'hello';
    expect(isEqual(a, b)).toBe(false);
  });

  it('should be true if dates are equal', () => {
    const a: Date = new Date(2024, 8, 27);
    const b: Date = new Date(2024, 8, 27);
    expect(isEqual(a, b)).toBe(true);
  });

  it('should be false if dates are not equal', () => {
    const a: Date = new Date(2024, 8, 27);
    const b: Date = new Date(2024, 8, 28);
    expect(isEqual(a, b)).toBe(false);
  });

  it('should be true if dates are equal including time', () => {
    const a: Date = new Date('2024-09-27T12:30:00');
    const b: Date = new Date('2024-09-27T12:30:00');
    expect(isEqual(a, b)).toBe(true);
  });

  it('should be false if dates are different by time', () => {
    const a: Date = new Date('2024-09-27T12:30:00');
    const b: Date = new Date('2024-09-27T13:30:00');
    expect(isEqual(a, b)).toBe(false);
  });
});
