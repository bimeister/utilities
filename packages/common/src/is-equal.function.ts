export function isEqual<T, U>(a: T, b: U): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}
