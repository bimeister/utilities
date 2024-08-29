import type { Comparator, Converter, Nullable } from '@bimeister/utilities.types';
import { isObjectKeyUsed } from './is-object-key-used.function';

export function getObjectPropertyComparator<T extends object = object>(
  propertyName: string,
  getValueToCompare?: Converter
): Comparator<T> {
  const comparator: Comparator<T> = (sourceA: T, sourceB: T) => {
    if (!isObjectKeyUsed(sourceA, propertyName) || !isObjectKeyUsed(sourceB, propertyName)) {
      return 0;
    }

    const itemA: T[keyof T] | undefined = sourceA[propertyName];
    const itemB: T[keyof T] | undefined = sourceB[propertyName];

    if (!valueExtractorIsUsed(getValueToCompare)) {
      return compare(itemA, itemB);
    }

    const convertedItemA: unknown = getValueToCompare(itemA);
    const convertedItemB: unknown = getValueToCompare(itemB);
    return compare(convertedItemA, convertedItemB);
  };

  return comparator;
}

function valueExtractorIsUsed(valueExtractor: Nullable<Converter>): valueExtractor is NonNullable<Converter> {
  return typeof valueExtractor === 'function';
}

const compare: Comparator = <T>(itemA: T, itemB: T): -1 | 0 | 1 => (itemA < itemB ? -1 : 1);
