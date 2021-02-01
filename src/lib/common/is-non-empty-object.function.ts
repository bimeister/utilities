import type { Predicate } from '../types/predicate.type';

export const isNonEmptyObject: Predicate<unknown> = (object: unknown): boolean => {
  return String(object) === '[object Object]' && !Object.is(Object.keys(object).length, 0);
};
