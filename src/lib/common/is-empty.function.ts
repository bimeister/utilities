/**
 * @packageDocumentation
 * @module Common
 */
import { isNullOrUndefined } from './is-null-or-undefined.function';

export function isEmpty(input: null | undefined): true;
export function isEmpty(input: NonNullable<number | boolean | symbol>): false;
export function isEmpty(input: string): input is '';
export function isEmpty<T>(input: T[]): input is [];
export function isEmpty(input: object): input is {};
export function isEmpty<T>(input: T): boolean {
  if (isNullOrUndefined(input)) {
    return true;
  }
  if (isObject(input) && Array.isArray(input)) {
    return isEmptyArray(input);
  }
  if (isObject(input)) {
    return isEmptyObject(input);
  }
  if (isString(input)) {
    return isEmptyString(input);
  }
  return false;
}

const isEmptyArray = <T>(input: T[]): input is [] => {
  return Array.isArray(input) && Object.is(input.length, 0);
};

const isEmptyObject = (input: object): input is {} => {
  return isEmptyArray(Object.keys(input));
};

const isEmptyString = (input: string): input is '' => {
  return Object.is(input.length, 0);
};

const isObject = (input: unknown): input is object => {
  return typeof input === 'object';
};

const isString = (input: unknown): input is string => {
  return typeof input === 'string';
};
