/**
 * @packageDocumentation
 * @module Common
 */
import { isNil } from './is-nil.function';
import { isObject } from './is-object.function';
import { isString } from './is-string.function';
import { isSymbol } from './is-symbol.function';

export function isEmpty(input: unknown): boolean {
  if (isNil(input)) {
    return true;
  }

  if (isObject(input)) {
    if (Array.isArray(input)) {
      return isEmptyArray(input);
    }

    if (input instanceof Set || input instanceof Map) {
      return isEmptySetOrMap(input);
    }

    if (!(input instanceof Date)) {
      return isEmptyObject(input);
    }
  }

  if (isString(input)) {
    return isEmptyString(input);
  }

  if (isSymbol(input)) {
    return false;
  }

  return false;
}

function isEmptyArray<T>(input: T[]): boolean {
  return Array.isArray(input) && Object.is(input.length, 0);
}

function isEmptyObject(input: object): boolean {
  return isEmptyArray(Object.keys(input));
}

function isEmptyString(input: string): boolean {
  return Object.is(input.length, 0);
}

function isEmptySetOrMap(input: Set<unknown> | Map<unknown, unknown>): boolean {
  return input.size === 0;
}
