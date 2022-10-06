import { isEmpty } from "./is-empty.function";

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
});
