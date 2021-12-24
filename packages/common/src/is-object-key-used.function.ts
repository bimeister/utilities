import type { Nullable, WithProperty } from 'packages/types';
import { isNil } from './is-nil.function';

export function isObjectKeyUsed<T extends object, K extends string = string>(
  object: T,
  key: Nullable<string>
): object is WithProperty<T, K> {
  return !isNil(key) && key in object;
}
