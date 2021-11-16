import type { ComparatorFunction } from '../types/custom-comparator.type';
import { isNil } from './is-nil.function';

type SortDirection = 'ascending' | 'descending';

// tslint:disable:unified-signatures
/** @example property = 'property.property...' */
export function sortByProperty<T>(array: T[], property: keyof T | string, comparator?: ComparatorFunction): T[];
export function sortByProperty<T>(array: T[], property: keyof T | string, sortDirection?: SortDirection): T[];
export function sortByProperty<T>(
  array: T[],
  property: keyof T | string,
  sortDirectionOrComparator: SortDirection | ComparatorFunction = 'ascending'
): T[] {
  if (!Array.isArray(array)) {
    return array;
  }

  if (sortDirectionOrComparator === 'ascending' || sortDirectionOrComparator === 'descending') {
    return sortWithComparator<T>(
      array,
      property,
      sortDirectionOrComparator === 'ascending' ? ascendingCompare : descendingCompare
    );
  }
  if (typeof sortDirectionOrComparator === 'function') {
    return sortWithComparator<T>(array, property, sortDirectionOrComparator);
  }

  return array;
}

const extractDataByNestedKey = <T>(object: T, nestedKey: string | keyof T): any => {
  const isNestedKey: boolean = typeof nestedKey === 'string' && nestedKey.includes('.');
  if (isNestedKey) {
    return extractDataByKeyPath(object, String(nestedKey).split('.'));
  }
  return object[nestedKey as keyof T];
};

const extractDataByKeyPath = <T>(entity: T, keyPath: string[]): any => {
  const extractedData: Map<string, any> = new Map<string, any>();
  keyPath.forEach((innerKeyPathPart: string, innerIndex: number, innerOrigin: string[]) => {
    const isFirstKey: boolean = Object.is(innerIndex, 0);
    if (isFirstKey) {
      extractedData.set(innerKeyPathPart, entity[innerKeyPathPart]);
      return;
    }
    const objectPart: any = extractedData.get(innerOrigin[innerIndex - 1]);
    if (isNil(objectPart)) {
      return;
    }
    if (!objectPart.hasOwnProperty(innerKeyPathPart)) {
      return;
    }
    extractedData.set(innerKeyPathPart, objectPart[innerKeyPathPart]);
  });
  const targetKey: string = keyPath[keyPath.length - 1];
  return extractedData.get(targetKey);
};

const ascendingCompare: ComparatorFunction = <T>(a: T, b: T): number => {
  const [aProperty, bProperty]: [T, T] = convertPropertiesToCompare(a, b);

  if (aProperty < bProperty) {
    return -1;
  }
  if (aProperty > bProperty) {
    return 1;
  }
  return 0;
};

const descendingCompare: ComparatorFunction = <T>(a: T, b: T): number => {
  const [aProperty, bProperty]: [T, T] = convertPropertiesToCompare(a, b);

  if (aProperty > bProperty) {
    return -1;
  }
  if (aProperty < bProperty) {
    return 1;
  }
  return 0;
};

const sortWithComparator = <T>(array: T[], property: string | keyof T, comparer: ComparatorFunction) => {
  const sortedArray: T[] = [...array].sort((a: T, b: T): number => {
    const computedA: any = extractDataByNestedKey(a, property);
    const computedB: any = extractDataByNestedKey(b, property);
    return comparer(computedA, computedB);
  });
  return sortedArray;
};

const convertPropertiesToCompare = (computedA: any, computedB: any): [any, any] => {
  if (
    (Number.parseFloat(computedA) === computedA && computedA % 1 !== 0) ||
    (Number.parseFloat(computedB) === computedB && computedB % 1 !== 0)
  ) {
    return [computedA, computedB];
  }

  const stringifiedComputedA: string = String(computedA).toLowerCase();
  const stringifiedComputedB: string = String(computedB).toLowerCase();

  const parsedIntA: number = Number.parseInt(stringifiedComputedA, 10);
  const parsedIntB: number = Number.parseInt(stringifiedComputedB, 10);

  if (
    !Number.isNaN(parsedIntA) &&
    !Number.isNaN(parsedIntB) &&
    Object.is(String(parsedIntA).length, stringifiedComputedA.length) &&
    Object.is(String(parsedIntB).length, stringifiedComputedB.length)
  ) {
    return [parsedIntA, parsedIntB];
  }
  return [stringifiedComputedA, stringifiedComputedB];
};
