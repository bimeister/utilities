import type { StateOperator } from '@ngxs/store';
import { isEmpty, isNil } from 'packages/common';

export const removeMultipleItemsByProperty = <T extends object>(
  propertyName: keyof T,
  propertyValues: T[keyof T][]
): StateOperator<T[]> => {
  return (state: Readonly<T[]>): T[] => {
    const propertyNameIsUndefined: boolean = isNil(propertyName);
    if (propertyNameIsUndefined) {
      return [...state];
    }

    const stateIsEmpty: boolean = !Array.isArray(state) || isEmpty(state);
    if (stateIsEmpty) {
      return [];
    }

    const propertyValuesSet: Set<T[keyof T]> = new Set<T[keyof T]>(propertyValues);
    const itemsByProperty: Set<T> = new Set<T>(
      state.filter((item: T) => !isNil(item[propertyName]) && propertyValuesSet.has(item[propertyName]))
    );
    return state.filter((item: T) => !itemsByProperty.has(item));
  };
};
