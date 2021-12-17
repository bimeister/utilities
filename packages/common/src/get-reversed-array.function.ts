import { isEmpty } from './is-empty.function';

export function getReversedArray<T>(array: T[]): T[] {
  return Array.isArray(array) && !isEmpty(array) ? [...array].reverse() : [];
}
