import { getArrayFirstElement } from "./get-array-first-element.function";

describe('is-get-array-first-element.function.ts', () => {
  it('should return first element of array', () => {
    expect(getArrayFirstElement([1, 2, 3])).toEqual(1);
  });

  it('should return undefined if array is empty', () => {
    expect(getArrayFirstElement([])).toBe(undefined);
  });
});
