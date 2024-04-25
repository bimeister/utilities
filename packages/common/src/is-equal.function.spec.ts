import { isEqual } from './is-equal.function';

describe('is-equal.function.ts', () => {
  it('should be true if objects are equal', () => {
    const a: unknown = {
      property: 'property'
    };
    const b: unknown = {
      property: 'property'
    };
    expect(isEqual(a, b)).toBe(true);
  });

  it('should be false if objects are not equal', () => {
    const a: unknown = {
      propertyOne: true
    };
    const b: unknown = {
      propertyTwo: false
    };
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
});
