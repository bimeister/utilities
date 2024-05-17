import { isEmpty } from './is-empty.function';

export function nullIfEmpty<T>(value: T): T | null {
  return isEmpty(value) ? null : value;
}
