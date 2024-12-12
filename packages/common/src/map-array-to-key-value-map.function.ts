import { isNil } from './is-nil.function';

/**
 * Converts an array of objects into a `Map`, where each key-value pair is derived from a specified key in the object.
 * If `ignoreNils` is `true`, `null` and `undefined` keys will be excluded from the resulting `Map`.
 *
 * @template T - The type of objects in the array.
 * @template Key - The key of each object to use as the map key.
 *
 * @param array - The array of objects to convert.
 * @param key - The key of each object to use as the map key.
 * @param ignoreNils - Whether to exclude `null` and `undefined` keys from the `Map`.
 * @returns A `Map` where each key is the value of the specified key in the objects, and the value is the object itself.
 * If `ignoreNils` is `true`, keys will exclude `null` and `undefined`.
 */
export function mapArrayToKeyValueMap<T extends object, Key extends keyof T>(
  array: T[],
  key: Key,
  ignoreNils: true
): Map<NonNullable<T[Key]>, T>;

/**
 * Converts an array of objects into a `Map`, where each key-value pair is derived from a specified key in the object.
 * If `ignoreNils` is `false` or not provided, `null` and `undefined` keys will be included in the resulting `Map`.
 *
 * @template T - The type of objects in the array.
 * @template Key - The key of each object to use as the map key.
 *
 * @param array - The array of objects to convert.
 * @param key - The key of each object to use as the map key.
 * @param ignoreNils - Whether to exclude `null` and `undefined` keys from the `Map`.
 * @returns A `Map` where each key is the value of the specified key in the objects, and the value is the object itself.
 */
export function mapArrayToKeyValueMap<T extends object, Key extends keyof T>(
  array: T[],
  key: Key,
  ignoreNils?: false
): Map<T[Key], T>;

/**
 * Implementation of `mapArrayToKeyValueMap`, which handles both overloads.
 */
export function mapArrayToKeyValueMap<T extends object, Key extends keyof T>(
  array: T[],
  key: Key,
  ignoreNils: boolean = false
): Map<T[Key] | NonNullable<T[Key]>, T> {
  const result: Map<T[Key] | NonNullable<T[Key]>, T> = new Map<T[Key] | NonNullable<T[Key]>, T>();

  for (const item of array) {
    const keyValue: T[Key] = item[key];
    if (!ignoreNils || !isNil(keyValue)) {
      result.set(keyValue, item);
    }
  }

  return result;
}
