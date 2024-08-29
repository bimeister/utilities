import type { WithProperty } from '@bimeister/utilities.traits';
import type { Nullable } from '@bimeister/utilities.types';
import { isNil } from './is-nil.function';
import { isObject } from './is-object.function';

export function isObjectKeyUsed<T extends object, K extends PropertyKey>(
  object: T,
  key: Nullable<K>
): object is WithProperty<T, K>;
export function isObjectKeyUsed(object: unknown, key: Nullable<string>): object is WithProperty<object, string> {
  if (!isObject(object)) {
    return false;
  }

  if (isNil(key) || isNil(object)) {
    return false;
  }

  return key in object;
}
