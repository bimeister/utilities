import { isNil } from './is-nil.function';

/**
 * Converts an array of objects into an array of `[key, object]` tuples,
 * where each key-value pair is derived from a specified key in the object.
 * If `ignoreNils` is `true`, `null` and `undefined` keys will be excluded from the resulting array.
 *
 * @template T - The type of objects in the array.
 * @template Key - The key of each object to use as the tuple key.
 *
 * @param array - The array of objects to convert.
 * @param key - The key of each object to use as the tuple key.
 * @param ignoreNils - Whether to exclude `null` and `undefined` keys from the array.
 * @returns An array of `[key, object]` tuples, excluding `null` and `undefined` keys if `ignoreNils` is `true`.
 */
export function mapArrayToKeyValueTuple<T extends object, Key extends keyof T>(
  array: T[],
  key: Key,
  ignoreNils: true
): [NonNullable<T[Key]>, T][];

/**
 * Converts an array of objects into an array of `[key, object]` tuples,
 * where each key-value pair is derived from a specified key in the object.
 * If `ignoreNils` is `false` or not provided, `null` and `undefined` keys will be included in the resulting array.
 *
 * @template T - The type of objects in the array.
 * @template Key - The key of each object to use as the tuple key.
 *
 * @param array - The array of objects to convert.
 * @param key - The key of each object to use as the tuple key.
 * @param ignoreNils - Whether to exclude `null` and `undefined` keys from the array.
 * @returns An array of `[key, object]` tuples, including `null` and `undefined` keys if `ignoreNils` is `false`.
 */
export function mapArrayToKeyValueTuple<T extends object, Key extends keyof T>(
  array: T[],
  key: Key,
  ignoreNils?: false
): [T[Key], T][];

/**
 * Converts an array of objects into an array of `[key, object]` tuples,
 * where each key-value pair is derived from a specified key in the object.
 * This function supports overloads to handle cases where `ignoreNils` is either `true` or `false`.
 *
 * @template T - The type of objects in the array.
 * @template Key - The key of each object to use as the tuple key.
 *
 * @param array - The array of objects to convert.
 * @param key - The key of each object to use as the tuple key.
 * @param ignoreNils - Whether to exclude `null` and `undefined` keys from the array.
 * @returns An array of `[key, object]` tuples.
 */
export function mapArrayToKeyValueTuple<T extends object, Key extends keyof T>(
  array: T[],
  key: Key,
  ignoreNils: boolean = false
): [T[Key], T][] | [NonNullable<T[Key]>, T][] {
  const resultArray: [T[Key], T][] = [];

  for (const item of array) {
    const keyValue: T[Key] = item[key];
    if (!ignoreNils || !isNil(keyValue)) {
      resultArray.push([keyValue, item]);
    }
  }

  return resultArray;
}
