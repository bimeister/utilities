import { getObjectPropertyComparator } from './get-object-property-comparator.function';
import type { Comparator } from '@bimeister/utilities.types';

describe('get-object-property-comparator.function.ts', () => {
  it('should return result of compare', () => {
    const comparator: Comparator<object> = getObjectPropertyComparator('age', null as any);
    const sourceA: object = {
      age: 23,
    };
    const sourceB: object = {
      age: 25,
    };
    expect(comparator(sourceA, sourceB)).toEqual(-1);
  });

  it('should return 0 if one of the arguments does not contain a property of compare', () => {
    const comparator: Comparator<object> = getObjectPropertyComparator('age');
    const sourceA: object = {
      age: 23,
    };
    const sourceB: object = {
      id: 25,
    };
    expect(comparator(sourceA, sourceB)).toEqual(0);
  });
});
