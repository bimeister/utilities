import type { StateOperator } from './../../../internal/types/state-operator.type';
import { isEmpty } from './../../common/is-empty.function';
import { isNil } from './../../common/is-nil.function';

export function removeItemByProperty<T extends object>(
  propertyName: keyof T,
  propertyValue: T[keyof T]
): StateOperator<T[]> {
  return (state: Readonly<T[]>): T[] => {
    const propertyNameIsUndefined: boolean = isNil(propertyName);
    if (propertyNameIsUndefined) {
      return [...state];
    }

    const stateIsEmpty: boolean = !Array.isArray(state) || isEmpty(state);
    if (stateIsEmpty) {
      return [];
    }

    return state.filter((item: T) => item[propertyName] !== propertyValue);
  };
}
