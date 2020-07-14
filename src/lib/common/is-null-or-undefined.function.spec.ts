import { isNullOrUndefined } from './is-null-or-undefined.function';

describe('is-null-or-undefined.function.ts', () => {
  it('should be true if argument is null', () => {
    expect(isNullOrUndefined(null)).toBe(true);
  });

  it('should be true if argument is undefined', () => {
    expect(isNullOrUndefined(undefined)).toBe(true);
  });

  it('should be false if argument is {}', () => {
    expect(isNullOrUndefined({})).toBe(false);
  });

  it('should be false if argument is 0', () => {
    expect(isNullOrUndefined(0)).toBe(false);
  });

  it('should be false if argument is "word"', () => {
    expect(isNullOrUndefined('word')).toBe(false);
  });
});
