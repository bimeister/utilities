import { VOID } from './../../internal/constants/void.const';
import { isEmpty } from './is-empty.function';

export function getPagedArray<T>(items: T[], perPageCount: number): T[][] {
  if (!Array.isArray(items) || isEmpty(items)) {
    return [];
  }

  if (items.length <= perPageCount) {
    return [items];
  }

  const pagesCount: number = Math.ceil(items.length / perPageCount);
  return new Array(pagesCount).fill(VOID).map((_, index: number) => {
    const currentSliceStartIndex: number = index * pagesCount;
    const currentSliceEndIndex: number = currentSliceStartIndex + pagesCount;
    return items.slice(currentSliceStartIndex, currentSliceEndIndex);
  });
}
