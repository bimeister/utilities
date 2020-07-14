export function getShuffledArray<T>(array: T[]): T[] {
  if (!Array.isArray(array) || Object.is(array.length, 0)) {
    return [];
  }
  return [...array].sort(() => Math.random() - 0.5);
}
