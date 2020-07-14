import type { StateContext } from './../../../internal/types/state-context.type';

export const getFromStateByProperty: <T>(
  context: StateContext<T[]>,
  findByPropertyName: keyof T,
  targetPropertyValue: T[keyof T]
) => T = <T>(context: StateContext<T[]>, findByPropertyName: keyof T, targetPropertyValue: T[keyof T]): T =>
  context.getState().find((storeItem: T) => storeItem[findByPropertyName] === targetPropertyValue);
