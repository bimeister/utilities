/**
 * Converts an array of objects into a `Map`, where each key-value pair is derived from a specified key in the object.
 *
 * @template T - The type of objects in the array.
 * @template Key - The key of each object to use as the map key.
 *
 * @param array - The array of objects to convert.
 * @param key - The key of each object to use as the map key.
 * @returns A `Map` where each key is the value of the specified key in the objects,
 * and the value is the object itself.
 *
 * @example
 * const array = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 3, name: 'Charlie' }
 * ];
 * const map = mapArrayToKeyValueMap(array, 'id');
 * Map will contain:
 * 1 -> { id: 1, name: 'Alice' }
 * 2 -> { id: 2, name: 'Bob' }
 * 3 -> { id: 3, name: 'Charlie' }
 */
export function mapArrayToKeyValueMap<T extends object, Key extends keyof T>(array: T[], key: Key): Map<T[Key], T> {
  return new Map<T[Key], T>(array.map((item: T) => [item[key], item]));
}
