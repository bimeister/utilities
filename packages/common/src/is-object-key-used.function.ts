import type { WithProperty } from '@workspaces/traits';
import type { Nullable } from '@workspaces/types';
import { isNil } from './is-nil.function';

export function isObjectKeyUsed<T extends object, K extends string = string>(
  object: T,
  key: Nullable<string>
): object is WithProperty<T, K>;
export function isObjectKeyUsed(object: unknown, key: Nullable<string>): object is WithProperty<object, string> {
  if (typeof object !== 'object') {
    return false;
  }

  if (isNil(key) || isNil(object)) {
    return false;
  }

  return key in object;
}
