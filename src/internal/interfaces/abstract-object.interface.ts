/**
 * @internal
 * */

export interface AbstractObject<T = unknown> {
  [propertyName: string]: T;
}
