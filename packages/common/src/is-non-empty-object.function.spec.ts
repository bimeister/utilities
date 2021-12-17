import { isNonEmptyObject } from './is-non-empty-object.function';

describe('is-non-empty-object.function.ts', () => {
  it('should return false for empty object', () => {
    expect(isNonEmptyObject({})).toBeFalsy();
  });

  it('should return true for filled object', () => {
    expect(isNonEmptyObject({ a: 1 })).toBeTruthy();
  });

  it('should return false for non-object input', () => {
    expect(isNonEmptyObject(null)).toBeFalsy();
    expect(isNonEmptyObject(1)).toBeFalsy();
    expect(isNonEmptyObject(true)).toBeFalsy();
    expect(isNonEmptyObject(NaN)).toBeFalsy();
    expect(isNonEmptyObject(void 0)).toBeFalsy();
  });
});
