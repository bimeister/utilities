import { isEmpty, isNil } from '@bimeister/utilities.common';
import type { StateOperator } from '@ngxs/store';

export function setItemByProperty<T extends object>(
  newItem: T,
  propertyName: keyof T,
  type: 'new-to-start' | 'new-to-end' = 'new-to-start'
): StateOperator<T[]> {
  return (state: Readonly<T[]>): T[] => {
    const incomingDataIsEmpty: boolean = isNil(newItem) || isNil(propertyName);
    if (incomingDataIsEmpty) {
      return [...state];
    }

    const stateIsEmpty: boolean = !Array.isArray(state) || isEmpty(state);
    if (stateIsEmpty) {
      return [newItem];
    }

    const existingItemIndex: number = state.findIndex((item: T) => item[propertyName] === newItem[propertyName]);

    const itemDoesNotExistInState: boolean = Object.is(existingItemIndex, -1);
    if (itemDoesNotExistInState) {
      return type === 'new-to-start' ? [newItem, ...state] : [...state, newItem];
    }

    return state.map((item: T, index: number) => {
      const isTargetIndex: boolean = Object.is(existingItemIndex, index);
      return isTargetIndex ? newItem : item;
    });
  };
}
