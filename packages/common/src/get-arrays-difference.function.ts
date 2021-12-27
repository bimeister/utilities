import type { Primitive } from '@workspaces/types';
import { isNil } from './is-nil.function';
import { isObjectKeyUsed } from './is-object-key-used.function';

export function getArraysDifference(arrayA: string[], arrayB: string[]): string[];
export function getArraysDifference(arrayA: boolean[], arrayB: boolean[]): boolean[];
export function getArraysDifference(arrayA: number[], arrayB: number[]): number[];
export function getArraysDifference(arrayA: Primitive[], arrayB: Primitive[]): Primitive[];
export function getArraysDifference<T extends object>(arrayA: T[], arrayB: T[], objectKey: string): T[];
export function getArraysDifference<T>(arrayA: T[], arrayB: T[], objectKey?: string): T[] {
  const resultCollection: Map<T | T[keyof T], T> = new Map<T | T[keyof T], T>();

  arrayA.forEach((arrayItem: T) => {
    if (!isObject<T>(arrayItem) || isNil(objectKey)) {
      resultCollection.set(arrayItem, arrayItem);
      return;
    }

    if (!isObjectKeyUsed(arrayItem, objectKey)) {
      return;
    }
    resultCollection.set(arrayItem[objectKey], arrayItem);
  });

  arrayB.forEach((arrayItem: T) => {
    if (!isObject<T>(arrayItem) || isNil(objectKey)) {
      resultCollection.delete(arrayItem);
      return;
    }

    if (!isObjectKeyUsed(arrayItem, objectKey) || !resultCollection.has(arrayItem[objectKey])) {
      return;
    }
    resultCollection.delete(arrayItem[objectKey]);
  });

  return Array.from(resultCollection.values());
}

function isObject<T>(arrayItem: T): arrayItem is T & {} {
  return !isNil(arrayItem) || typeof arrayItem === 'object';
}
