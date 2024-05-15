export function mapArrayToKeyValueMap<T extends object, Key extends keyof T>(array: T[], key: Key): Map<T[Key], T> {
  return new Map<T[Key], T>(array.map((item: T) => [item[key], item]));
}
