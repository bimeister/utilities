import { isEmpty } from './is-empty.function';
import { isNil } from './is-nil.function';

export function getArrayWithMovedItems<T>(array: T[], fromIndex: number, toIndex: number): T[] {
  if (!Array.isArray(array) || isEmpty(array) || isNil(fromIndex) || isNil(toIndex)) {
    return [];
  }

  const updatedArray: T[] = [...array];
  const savedElement: T = updatedArray[fromIndex];
  updatedArray.splice(fromIndex, 1);
  updatedArray.splice(toIndex, 0, savedElement);

  return updatedArray;
}
