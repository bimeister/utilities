export function mapArrayToKeySet<T extends object, Key extends keyof T>(array: T[], key: Key): Set<T[Key]> {
  return new Set<T[Key]>(array.map((item: T) => item[key]));
}
