import { getObjectPropertyComparator } from "./get-object-property-comparator.function";

describe('get-object-property-comparator.function.ts', () => {
  it('should return result of compare', () => {
    const comparator = getObjectPropertyComparator('age', null as any);
    const sourceA = {
      age: 23
    };
    const sourceB = {
      age: 25
    };
    expect(comparator(sourceA, sourceB)).toEqual(-1);
  });

  it('should return 0 if one of the arguments does not contain a property of compare ', () => {
    const comparator = getObjectPropertyComparator('age');
    const sourceA = {
      age: 23
    };
    const sourceB = {
      id: 25
    };
    expect(comparator(sourceA, sourceB)).toEqual(0);
  });
});
