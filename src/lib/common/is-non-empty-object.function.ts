import { Predicate } from '@angular/core';

export const isNonEmptyObject: Predicate<unknown> = (object: unknown): boolean => {
  return String(object) === '[object Object]' && !Object.is(Object.keys(object).length, 0);
};
