import type { StateContext } from '@ngxs/store';

export const getFromStateByProperty: <T extends object>(
  context: StateContext<T[]>,
  findByPropertyName: keyof T,
  targetPropertyValue: T[keyof T]
) => T | undefined = <T extends object>(
  context: StateContext<T[]>,
  findByPropertyName: keyof T,
  targetPropertyValue: T[keyof T]
): T | undefined => context.getState().find((storeItem: T) => storeItem[findByPropertyName] === targetPropertyValue);
