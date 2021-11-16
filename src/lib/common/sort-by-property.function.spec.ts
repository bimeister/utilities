import type { ComparatorFunction } from '../types/custom-comparator.type';
import type { AbstractObject } from './../../internal/interfaces/abstract-object.interface';
import { sortByProperty } from './sort-by-property.function';

const customComparatorDateAscending: ComparatorFunction = <T>(a: T, b: T) => {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return 0;
  }
  if (new Date(a) < new Date(b)) {
    return -1;
  }
  if (new Date(a) > new Date(b)) {
    return 1;
  }
  return 0;
};

const customComparatorDateDescending: ComparatorFunction = <T>(a: T, b: T) => {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return 0;
  }
  if (new Date(a) < new Date(b)) {
    return 1;
  }
  if (new Date(a) > new Date(b)) {
    return -1;
  }
  return 0;
};

describe('sort-by-property.function.ts', () => {
  const unsortedObjects: AbstractObject[] = [
    { word: 'lorem' },
    { word: 'ipsum' },
    { word: 'dolor' },
    { word: 'sit' },
    { word: 'amen' },
    { word: 'consenter' },
    { word: 'advising' },
    { word: 'elite' }
  ];

  const unsortedDeepObjects: AbstractObject[] = [
    { word: { is: { much: { deeper: { than: { you: { expected: 'lorem' } } } } } } },
    { word: { is: { much: { deeper: { than: { you: { expected: 'ipsum' } } } } } } },
    { word: { is: { much: { deeper: { than: { you: { expected: 'dolor' } } } } } } },
    { word: { is: { much: { deeper: { than: { you: { expected: 'sit' } } } } } } },
    { word: { is: { much: { deeper: { than: { you: { expected: 'amen' } } } } } } },
    { word: { is: { much: { deeper: { than: { you: { expected: 'consenter' } } } } } } },
    { word: { is: { much: { deeper: { than: { you: { expected: 'advising' } } } } } } },
    { word: { is: { much: { deeper: { than: { you: { expected: 'elite' } } } } } } }
  ];

  const unsortedDateList: AbstractObject[] = [
    { date: '2021-12-30T02:09:00' },
    { date: '2020-12-30T02:09:00' },
    { date: '2019-12-30T02:09:00' },
    { date: '2022-12-30T02:09:00' },
    { date: '2023-12-30T02:09:00' }
  ];

  it('should ascending sort objects by 1st level property', () => {
    const ascendingSortedObjects: AbstractObject[] = [
      { word: 'advising' },
      { word: 'amen' },
      { word: 'consenter' },
      { word: 'dolor' },
      { word: 'elite' },
      { word: 'ipsum' },
      { word: 'lorem' },
      { word: 'sit' }
    ];
    expect(sortByProperty(unsortedObjects, 'word', 'ascending')).toEqual(ascendingSortedObjects);
  });

  it('should descending sort objects by 1st level property', () => {
    const descendingSortedObjects: AbstractObject[] = [
      { word: 'sit' },
      { word: 'lorem' },
      { word: 'ipsum' },
      { word: 'elite' },
      { word: 'dolor' },
      { word: 'consenter' },
      { word: 'amen' },
      { word: 'advising' }
    ];
    expect(sortByProperty(unsortedObjects, 'word', 'descending')).toEqual(descendingSortedObjects);
  });

  it('should ascending sort objects by deep property', () => {
    const ascendingSortedObjects: AbstractObject[] = [
      { word: { is: { much: { deeper: { than: { you: { expected: 'advising' } } } } } } },
      { word: { is: { much: { deeper: { than: { you: { expected: 'amen' } } } } } } },
      { word: { is: { much: { deeper: { than: { you: { expected: 'consenter' } } } } } } },
      { word: { is: { much: { deeper: { than: { you: { expected: 'dolor' } } } } } } },
      { word: { is: { much: { deeper: { than: { you: { expected: 'elite' } } } } } } },
      { word: { is: { much: { deeper: { than: { you: { expected: 'ipsum' } } } } } } },
      { word: { is: { much: { deeper: { than: { you: { expected: 'lorem' } } } } } } },
      { word: { is: { much: { deeper: { than: { you: { expected: 'sit' } } } } } } }
    ];
    expect(sortByProperty(unsortedDeepObjects, 'word.is.much.deeper.than.you.expected', 'ascending')).toEqual(
      ascendingSortedObjects
    );
  });

  it('should descending sort objects by deep property', () => {
    const descendingSortedObjects: AbstractObject[] = [
      { word: { is: { much: { deeper: { than: { you: { expected: 'sit' } } } } } } },
      { word: { is: { much: { deeper: { than: { you: { expected: 'lorem' } } } } } } },
      { word: { is: { much: { deeper: { than: { you: { expected: 'ipsum' } } } } } } },
      { word: { is: { much: { deeper: { than: { you: { expected: 'elite' } } } } } } },
      { word: { is: { much: { deeper: { than: { you: { expected: 'dolor' } } } } } } },
      { word: { is: { much: { deeper: { than: { you: { expected: 'consenter' } } } } } } },
      { word: { is: { much: { deeper: { than: { you: { expected: 'amen' } } } } } } },
      { word: { is: { much: { deeper: { than: { you: { expected: 'advising' } } } } } } }
    ];
    expect(sortByProperty(unsortedDeepObjects, 'word.is.much.deeper.than.you.expected', 'descending')).toEqual(
      descendingSortedObjects
    );
  });

  it('should descending sort by custom comparator', () => {
    const descendingSortedItems: AbstractObject[] = [
      { date: '2023-12-30T02:09:00' },
      { date: '2022-12-30T02:09:00' },
      { date: '2021-12-30T02:09:00' },
      { date: '2020-12-30T02:09:00' },
      { date: '2019-12-30T02:09:00' }
    ];
    expect(sortByProperty(unsortedDateList, 'date', customComparatorDateDescending)).toEqual(descendingSortedItems);
  });

  it('should ascending sort by custom comparator', () => {
    const ascendingSortedItems: AbstractObject[] = [
      { date: '2019-12-30T02:09:00' },
      { date: '2020-12-30T02:09:00' },
      { date: '2021-12-30T02:09:00' },
      { date: '2022-12-30T02:09:00' },
      { date: '2023-12-30T02:09:00' }
    ];
    expect(sortByProperty(unsortedDateList, 'date', customComparatorDateAscending)).toEqual(ascendingSortedItems);
  });
});
