import { getArrayLastElement } from './get-array-last-element.function';

describe('is-get-array-last-element.function.ts', () => {
  it('should return last element of array', () => {
    expect(getArrayLastElement([1, 2, 3])).toEqual(3);
  });

  it('should return undefined if array is empty', () => {
    expect(getArrayLastElement([])).toBe(undefined);
  });
});
