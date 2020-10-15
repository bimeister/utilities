import { isNil } from './is-nil.function';

/** @example property = 'property.property...' */
export const sortByProperty = <T>(
  array: T[],
  property: keyof T | string,
  ascending: 'ascending' | 'descending' = 'ascending'
): T[] => {
  if (!Array.isArray(array)) {
    return array;
  }
  const sortedArray: T[] = [...array].sort((a: T, b: T): number => {
    const computedA: any = extractDataByNestedKey(a, property);
    const computedB: any = extractDataByNestedKey(b, property);

    if (
      (Number.parseFloat(computedA) === computedA && computedA % 1 !== 0) ||
      (Number.parseFloat(computedB) === computedB && computedB % 1 !== 0)
    ) {
      return compare(computedA, computedB);
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
      return compare(parsedIntA, parsedIntB);
    }
    return compare(stringifiedComputedA, stringifiedComputedB);
  });
  return ascending === 'ascending' ? sortedArray : [...sortedArray].reverse();
};

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

const compare = <T>(a: T, b: T): 1 | 0 | -1 => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};
