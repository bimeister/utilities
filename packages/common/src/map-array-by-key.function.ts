import { isNil } from './is-nil.function';

/**
 * Maps an array of objects to an array of values corresponding to the specified key.
 * If `ignoreNils` is `true`, `null` and `undefined` values will be excluded from the resulting array.
 *
 * @template T - The type of objects in the input array.
 * @template Key - The type of the key in the objects.
 *
 * @param array - The array of objects to map.
 * @param key - The key whose values will be used to create the array.
 * @param [ignoreNils=false] - Whether to exclude `null` and `undefined` values from the array.
 *
 * @returns An array of values from the specified key.
 */
export function mapArrayByKey<T extends object, Key extends keyof T>(
  array: T[],
  key: Key,
  ignoreNils: true
): NonNullable<T[Key]>[];

/**
 * Maps an array of objects to an array of values corresponding to the specified key.
 * If `ignoreNils` is `false` or not provided, `null` and `undefined` values will be included in the resulting array.
 *
 * @template T - The type of objects in the input array.
 * @template Key - The type of the key in the objects.
 *
 * @param array - The array of objects to map.
 * @param key - The key whose values will be used to create the array.
 * @param [ignoreNils=false] - Whether to exclude `null` and `undefined` values from the array.
 *
 * @returns An array of values from the specified key, which may include `null` and `undefined`.
 */
export function mapArrayByKey<T extends object, Key extends keyof T>(
  array: T[],
  key: Key,
  ignoreNils?: false
): T[Key][];

/**
 * Maps an array of objects to an array of values corresponding to the specified key.
 * This function supports overloads to handle cases where `ignoreNils` is either `true` or `false`.
 *
 * @template T - The type of objects in the input array.
 * @template Key - The type of the key in the objects.
 *
 * @param array - The array of objects to map.
 * @param key - The key whose values will be used to create the array.
 * @param [ignoreNils=false] - Whether to exclude `null` and `undefined` values from the array.
 *
 * @returns An array of values from the specified key.
 */
export function mapArrayByKey<T extends object, Key extends keyof T>(
  array: T[],
  key: Key,
  ignoreNils: boolean = false
): T[Key][] | NonNullable<T[Key]>[] {
  const resultArray: T[Key][] = [];

  for (const item of array) {
    const value: T[Key] = item[key];
    if (!ignoreNils || !isNil(value)) {
      resultArray.push(value);
    }
  }

  return resultArray;
}
