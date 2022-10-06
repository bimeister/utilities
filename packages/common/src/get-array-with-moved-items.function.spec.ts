import { getArrayWithMovedItems } from './get-array-with-moved-items.function';

describe('get-array-with-moved-items.function.ts', () => {
  it('should return empty array if invalid input is passed', () => {
    expect(getArrayWithMovedItems([], 1, 2)).toHaveLength(0);
    expect(getArrayWithMovedItems(null as any, 1, 2)).toHaveLength(0);
    expect(getArrayWithMovedItems([1, 2], null as any as number, 2)).toHaveLength(0);
    expect(getArrayWithMovedItems([1, 2], 1, null as any as number)).toHaveLength(0);
  });

  it('should return array with moved items', () => {
    expect(getArrayWithMovedItems([1, 2, 3, 4], 1, 2)).toEqual([1, 3, 2, 4]);
  });
});
