import { isEqual } from './is-equal.function';

describe('is-equal.function.ts', () => {
  it('should be true if arguments are equal', () => {
    const a: unknown = {
      property: 'property'
    };
    const b: unknown = {
      property: 'property'
    };
    expect(isEqual(a, b)).toBe(true);
  });

  it('should be false if arguments are not equal', () => {
    const a: unknown = {
      propertyOne: true
    };
    const b: unknown = {
      propertyTwo: false
    };
    expect(isEqual(a, b)).toBe(false);
  });
});
