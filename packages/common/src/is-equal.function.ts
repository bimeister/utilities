import { isNil } from './is-nil.function';
import { isNumber } from './is-number.function';
import { isString } from './is-string.function';

/**
 * Compares two values of any type for equality.
 *
 * @param a - The first value to compare.
 * @param b - The second value to compare.
 * @returns `true` if the values are equal, otherwise `false`.
 */
export function isEqual<T>(a: T, b: T): boolean;

/**
 * Compares two arrays for equality with an optional sort predicate.
 *
 * @param a - The first array to compare.
 * @param b - The second array to compare.
 * @param sortPredicate - An optional predicate to sort the arrays before comparison.
 * @returns `true` if the arrays are equal, otherwise `false`.
 */
export function isEqual<T>(a: T[], b: T[], sortPredicate?: (x: T, y: T) => number): boolean;

/**
 * Compares two strings for equality with an optional case-sensitive flag.
 *
 * @param a - The first string to compare.
 * @param b - The second string to compare.
 * @param caseSensitive - Optional flag to perform case-sensitive comparison. Defaults to true.
 * @returns `true` if the strings are equal, otherwise `false`.
 */
export function isEqual(a: string, b: string, caseSensitive?: boolean): boolean;

export function isEqual<T>(
  a: T | T[],
  b: T | T[],
  sortPredicateOrCaseSensitive?: ((x: T, y: T) => number) | boolean
): boolean {
  if (isNil(a) && isNil(b)) {
    return true;
  }

  if (isString(a) && isString(b)) {
    if (sortPredicateOrCaseSensitive === false) {
      return a.toLowerCase() === b.toLowerCase();
    }
    return a === b;
  }

  if (isNumber(a) && isNumber(b)) {
    return a === b;
  }

  if (Array.isArray(a) && Array.isArray(b) && typeof sortPredicateOrCaseSensitive === 'function') {
    return areArraysEqual(a, b, sortPredicateOrCaseSensitive);
  }

  if (a instanceof Set && b instanceof Set) {
    return areSetsEqual(a, b);
  }

  if (a instanceof Map && b instanceof Map) {
    return areMapsEqual(a, b);
  }

  if (a instanceof Date && b instanceof Date) {
    return areDatesEqual(a, b);
  }

  return JSON.stringify(a) === JSON.stringify(b);
}

function areArraysEqual<T>(a: T[], b: T[], sortPredicate?: (x: T, y: T) => number): boolean {
  if (a.length !== b.length) {
    return false;
  }

  if (!isNil(sortPredicate)) {
    a = a.slice().sort(sortPredicate);
    b = b.slice().sort(sortPredicate);
  }

  const firstArrayLength: number = a.length;

  for (let i: number = 0; i < firstArrayLength; i++) {
    if (!isEqual(a[i], b[i])) {
      return false;
    }
  }

  return true;
}

function areSetsEqual<T>(a: Set<T>, b: Set<T>): boolean {
  if (a.size !== b.size) {
    return false;
  }

  for (const item of a) {
    if (!b.has(item)) {
      return false;
    }
  }

  return true;
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

function areDatesEqual(a: Date, b: Date): boolean {
  return a.getTime() === b.getTime();
}
