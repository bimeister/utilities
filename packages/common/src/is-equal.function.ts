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
    return areArraysEqual(a, b);
  }

  if (a instanceof Set && b instanceof Set) {
    return areSetsEqual(a, b);
  }

  if (a instanceof Map && b instanceof Map) {
    return areMapsEqual(a, b);
  }

  return JSON.stringify(a) === JSON.stringify(b);
}

function areArraysEqual<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) {
    return false;
  }

  return a.every((item: T, index: number) => {
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

function areSetsEqual<T>(a: Set<T>, b: Set<T>): boolean {
  if (a.size !== b.size) {
    return false;
  }

  return [...a].every((item: T) => b.has(item));
}

function areMapsEqual<T, K>(a: Map<T, K>, b: Map<T, K>): boolean {
  if (a.size !== b.size) {
    return false;
  }

  for (const [key, value] of a) {
    if (!b.has(key) || !isEqual(value, b.get(key))) {
      return false;
    }
  }

  return true;
}
