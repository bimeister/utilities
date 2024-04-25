import { isNil } from './is-nil.function';
import { isNumber } from './is-number.function';
import { isString } from './is-string.function';

export function isEqual(a: unknown, b: unknown): boolean {
  if (isNil(a) && isNil(b)) {
    return true;
  }

  if (isString(a) && isString(b)) {
    return a === b;
  }

  if (isNumber(a) && isNumber(b)) {
    return a === b;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    return a.every((item: unknown, index: number) => {
      if (isNil(item) && isNil(b[index])) {
        return true;
      }

      if (isString(item) && isString(b[index])) {
        return item === b[index];
      }

      if (isNumber(item) && isNumber(b[index])) {
        return item === b[index];
      }

      return JSON.stringify(item) === JSON.stringify(b[index]);
    });
  }

  return JSON.stringify(a) === JSON.stringify(b);
}
