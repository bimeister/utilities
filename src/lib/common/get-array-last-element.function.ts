import { isEmpty } from './is-empty.function';

export function getArrayLastElement<T>(array: T[]): T | undefined {
  if (!Array.isArray(array) || isEmpty(array)) {
    return undefined;
  }
  const lastElementIndex: number = array.length - 1;
  return array[lastElementIndex];
}
