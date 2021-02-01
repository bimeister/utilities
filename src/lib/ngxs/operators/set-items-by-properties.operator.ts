import type { StateOperator } from '@ngxs/store';
import { isEmpty } from './../../common/is-empty.function';
import { isNil } from './../../common/is-nil.function';

export function setItemsByProperty<T extends object>(newItems: T[], propertyName: keyof T): StateOperator<T[]> {
  return (state: Readonly<T[]>): T[] => {
    const incomingDataIsEmpty: boolean = !Array.isArray(newItems) || isNil(propertyName);
    if (incomingDataIsEmpty) {
      return [...state];
    }

    const stateIsEmpty: boolean = !Array.isArray(state) || isEmpty(state);
    if (stateIsEmpty) {
      return [...newItems];
    }

    const stateItemByPropertyName: Map<T[keyof T], T> = new Map<T[keyof T], T>(
      [...state, ...newItems].map((item: T): [T[keyof T], T] => [item[propertyName], item])
    );
    return Array.from(stateItemByPropertyName.values());
  };
}
