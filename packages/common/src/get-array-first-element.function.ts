import { isEmpty } from './is-empty.function';

export function getArrayFirstElement<T>(array: T[]): T | undefined {
  if (!Array.isArray(array) || isEmpty(array)) {
    return undefined;
  }
  return array[0];
}
