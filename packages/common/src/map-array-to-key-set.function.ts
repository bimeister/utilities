import { isNil } from './is-nil.function';

/**
 * Maps an array of objects to a `Set` containing the values of the specified key.
 * If `ignoreNils` is `true`, `null` and `undefined` values will be excluded from the resulting `Set`.
 *
 * @template T - The type of objects in the input array.
 * @template Key - The type of the key in the objects.
 *
 * @param array - The array of objects to map.
 * @param key - The key whose values will be used to create the `Set`.
 * @param [ignoreNils=false] - Whether to exclude `null` and `undefined` values from the `Set`.
 *
 * @returns A `Set` containing unique, non-null, and non-undefined values from the specified key.
 *
 * @example
 * const array = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: null },
 *   { id: 3, name: 'Charlie' }
 * ];
 * const result = mapArrayToKeySet(array, 'name', true);
 * result: Set { 'Alice', 'Charlie' }
 */
export function mapArrayToKeySet<T extends object, Key extends keyof T>(
  array: T[],
  key: Key,
  ignoreNils: true
): Set<NonNullable<T[Key]>>;

/**
 * Maps an array of objects to a `Set` containing the values of the specified key.
 * If `ignoreNils` is `false` or not provided, `null` and `undefined` values will be included in the resulting `Set`.
 *
 * @template T - The type of objects in the input array.
 * @template Key - The type of the key in the objects.
 *
 * @param array - The array of objects to map.
 * @param key - The key whose values will be used to create the `Set`.
 * @param [ignoreNils=false] - Whether to exclude `null` and `undefined` values from the `Set`.
 *
 * @returns A `Set` containing unique values from the specified key, which may include `null` and `undefined`.
 *
 * @example
 * const array = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: null },
 *   { id: 3, name: 'Charlie' }
 * ];
 * const result = mapArrayToKeySet(array, 'name', false);
 * result: Set { 'Alice', null, 'Charlie' }
 */
export function mapArrayToKeySet<T extends object, Key extends keyof T>(
  array: T[],
  key: Key,
  ignoreNils?: false
): Set<T[Key]>;

/**
 * Maps an array of objects to a `Set` containing the values of the specified key.
 * This function supports overloads to handle cases where `ignoreNils` is either `true` or `false`.
 *
 * @template T - The type of objects in the input array.
 * @template Key - The type of the key in the objects.
 *
 * @param array - The array of objects to map.
 * @param key - The key whose values will be used to create the `Set`.
 * @param [ignoreNils=false] - Whether to exclude `null` and `undefined` values from the `Set`.
 *
 * @returns A `Set` containing unique values from the specified key.
 */
export function mapArrayToKeySet<T extends object, Key extends keyof T>(
  array: T[],
  key: Key,
  ignoreNils: boolean = false
): Set<T[Key]> | Set<NonNullable<T[Key]>> {
  const resultSet: Set<T[Key]> = new Set<T[Key]>();

  for (const item of array) {
    const value: T[Key] = item[key];
    if (!ignoreNils || !isNil(value)) {
      resultSet.add(value);
    }
  }

  return resultSet;
}
