import type { Primitive } from 'packages/types';
import { isEmpty } from './is-empty.function';

type ObjectOrPrimitive = object | Primitive;

export function getArrayUniqueElements(array: []): [];
export function getArrayUniqueElements(array: number[]): number[];
export function getArrayUniqueElements(array: boolean[]): boolean[];
export function getArrayUniqueElements(array: string[]): string[];
export function getArrayUniqueElements<T extends Primitive>(array: T[]): T[];
export function getArrayUniqueElements<T extends object>(array: T[], compareBy: keyof T): T[];

export function getArrayUniqueElements(
  array: ObjectOrPrimitive[],
  compareBy?: keyof ObjectOrPrimitive
): ObjectOrPrimitive[] {
  if (!Array.isArray(array) || isEmpty(array)) {
    return [];
  }

  if (isArrayOfObjects(array)) {
    return getArrayUniqueObjects(array, compareBy);
  }

  if (isArrayOfPrimitives(array)) {
    return getArrayUniquePrimitives(array);
  }

  return [];
}

function getArrayUniqueObjects<T extends object>(elements: T[], compareBy: keyof T): T[] {
  const uniqueElementsMap: Map<T[keyof T], T> = new Map<T[keyof T], T>();

  elements.forEach((element: T) => {
    const key: T[keyof T] = element[compareBy];
    if (uniqueElementsMap.has(key)) {
      return;
    }

    uniqueElementsMap.set(key, element);
  });

  return Array.from(uniqueElementsMap.values());
}

function getArrayUniquePrimitives<T = Primitive>(elements: T[]): T[] {
  const uniqueElementsSet: Set<T> = new Set<T>(elements);
  return Array.from(uniqueElementsSet.values());
}

function isArrayOfObjects<T>(array: T[]): array is (T & object)[] {
  return array.every((element: T) => typeof element === 'object');
}

function isArrayOfPrimitives(array: unknown[]): array is Primitive[] {
  return array.every((element: unknown) => typeof element !== 'object');
}
