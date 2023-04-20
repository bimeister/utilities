/**
 * @packageDocumentation
 * @module Common
 */
import { isNil } from './is-nil.function';

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

function isObject(input: unknown): input is object {
  return typeof input === 'object';
}

function isString(input: unknown): input is string {
  return typeof input === 'string';
}

function isSymbol(input: unknown): input is symbol {
  return typeof input === 'symbol';
}
