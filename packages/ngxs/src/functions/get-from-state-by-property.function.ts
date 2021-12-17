import type { StateContext } from 'packages/internal';

export const getFromStateByProperty: <T>(
  context: StateContext<T[]>,
  findByPropertyName: keyof T,
  targetPropertyValue: T[keyof T]
) => T = <T>(context: StateContext<T[]>, findByPropertyName: keyof T, targetPropertyValue: T[keyof T]): T =>
  context.getState().find((storeItem: T) => storeItem[findByPropertyName] === targetPropertyValue);
