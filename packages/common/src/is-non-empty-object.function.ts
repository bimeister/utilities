import type { Predicate } from '@workspaces/types';
import { isNil } from './is-nil.function';

export const isNonEmptyObject: Predicate<unknown> = (object: unknown): boolean => {
  if (typeof object !== 'object' || isNil(object)) {
    return false;
  }

  return String(object) === '[object Object]' && Object.keys(object).length !== 0;
};
