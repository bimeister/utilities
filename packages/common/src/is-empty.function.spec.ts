import { isEmpty } from './is-empty.function';

describe('is-empty.function.ts', () => {
  it('should be true if argument is null', () => {
    expect(isEmpty(null)).toBe(true);
  });

  it('should be true if argument is undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  it('should be true if argument is empty string', () => {
    expect(isEmpty('')).toBe(true);
  });

  it('should be true if argument is empty array', () => {
    expect(isEmpty([])).toBe(true);
  });

  it('should be true if argument is empty object', () => {
    expect(isEmpty({})).toBe(true);
  });

  it('should be false if argument is boolean value', () => {
    expect(isEmpty(false)).toBe(false);
  });

  it('should be false if argument is non-empty string', () => {
    expect(isEmpty('Hello')).toBe(false);
  });

  it('should be false if argument is non-empty array', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  it('should be false if argument is non-empty object', () => {
    expect(isEmpty({ key: 'value' })).toBe(false);
  });

  it('should be false if argument is number', () => {
    expect(isEmpty(42)).toBe(false);
  });

  it('should be false if argument is boolean true', () => {
    expect(isEmpty(true)).toBe(false);
  });

  it('should be false if argument is symbol', () => {
    expect(isEmpty(Symbol('symbol'))).toBe(false);
  });

  it('should be false if isEmpty() is called with the result of isEmpty()', () => {
    expect(isEmpty(isEmpty({}))).toBe(false);
  });

  it('should be false if argument is a Date object', () => {
    expect(isEmpty(new Date())).toBe(false);
  });

  it('should be false if argument is a Set with elements', () => {
    expect(isEmpty(new Set([1, 2, 3]))).toBe(false);
  });

  it('should be true if argument is an empty Set', () => {
    expect(isEmpty(new Set())).toBe(true);
  });

  it('should be false if argument is a Map with elements', () => {
    expect(isEmpty(new Map([['key', 'value']]))).toBe(false);
  });

  it('should be true if argument is an empty Map', () => {
    expect(isEmpty(new Map())).toBe(true);
  });

  it('should be false if argument is a function', () => {
    expect(
      isEmpty(() => {
        // Intentionally empty function for testing purposes
      })
    ).toBe(false);
  });
});
