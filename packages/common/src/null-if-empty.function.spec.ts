import { nullIfEmpty } from './null-if-empty.function';

describe('null-if-empty.function.ts', () => {
  it('should be true if argument is null', () => {
    expect(nullIfEmpty(null)).toBe(null);
  });

  it('should be true if argument is undefined', () => {
    expect(nullIfEmpty(undefined)).toBe(null);
  });

  it('should be true if argument is empty string', () => {
    expect(nullIfEmpty('')).toBe(null);
  });

  it('should be true if argument is empty array', () => {
    expect(nullIfEmpty([])).toBe(null);
  });

  it('should be true if argument is empty object', () => {
    expect(nullIfEmpty({})).toBe(null);
  });

  it('should be false if argument is boolean value', () => {
    expect(nullIfEmpty(false)).toBe(false);
  });

  it('should be false if argument is non-empty string', () => {
    expect(nullIfEmpty('Hello')).toEqual('Hello');
  });

  it('should be equals input if argument is non-empty array', () => {
    expect(nullIfEmpty([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should be equals input if argument is non-empty object', () => {
    expect(nullIfEmpty({ key: 'value' })).toEqual({ key: 'value' });
  });

  it('should be equals input if argument is number', () => {
    expect(nullIfEmpty(42)).toBe(42);
  });

  it('should be equals input if argument is boolean true', () => {
    expect(nullIfEmpty(true)).toBe(true);
  });

  it('should be true if argument is an empty Set', () => {
    expect(nullIfEmpty(new Set())).toBe(null);
  });

  it('should be true if argument is an empty Map', () => {
    expect(nullIfEmpty(new Map())).toBe(null);
  });
});
