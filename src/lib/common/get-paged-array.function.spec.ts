import { VOID } from './../../internal/constants/void.const';
import { getPagedArray } from './get-paged-array.function';

describe('get-paged-array.function.ts', () => {
  const initialItemsCount: number = 9876;
  const itemsPerPage: number = 10;

  const initialItems: number[] = new Array(initialItemsCount).fill(VOID).map((_, index: number) => index);
  const pagedItems: number[][] = getPagedArray(initialItems, itemsPerPage);

  it('should keep all initial items', () => {
    const flatPagedItems: number[] = pagedItems.flat(1);
    expect(flatPagedItems).toHaveLength(initialItemsCount);
    expect(flatPagedItems).toEqual(initialItems);
  });

  it('should have valid page count', () => {
    const targetPagesCount: number = Math.ceil(initialItemsCount / itemsPerPage);
    expect(pagedItems).toHaveLength(targetPagesCount);
  });

  it('should correctly process 1 page', () => {
    expect(getPagedArray(initialItems, initialItemsCount)).toHaveLength(1);
  });
});