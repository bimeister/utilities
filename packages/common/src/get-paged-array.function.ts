import { VOID } from '@bimeister/utilities.constants';
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
    const currentSliceStartIndex: number = index * perPageCount;
    const currentSliceEndIndex: number = currentSliceStartIndex + perPageCount;
    return items.slice(currentSliceStartIndex, currentSliceEndIndex);
  });
}
