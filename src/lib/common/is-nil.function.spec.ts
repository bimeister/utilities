import { isNil } from './is-nil.function';

describe('is-nil.function.ts', () => {
  it('should be true if argument is null', () => {
    expect(isNil(null)).toBe(true);
  });

  it('should be true if argument is undefined', () => {
    expect(isNil(undefined)).toBe(true);
  });

  it('should be false if argument is {}', () => {
    expect(isNil({})).toBe(false);
  });

  it('should be false if argument is 0', () => {
    expect(isNil(0)).toBe(false);
  });

  it('should be false if argument is "word"', () => {
    expect(isNil('word')).toBe(false);
  });
});
