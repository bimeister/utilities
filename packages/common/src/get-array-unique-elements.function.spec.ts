import { getArrayUniqueElements } from './get-array-unique-elements.function';

enum TestEnum {
  First,
  Second,
  Third
}

describe('get-array-unique-elements.function.ts', () => {
  it('should return empty array if invalid input is passed', () => {
    expect(getArrayUniqueElements([])).toHaveLength(0);
    expect(getArrayUniqueElements(null as any)).toHaveLength(0);
    expect(getArrayUniqueElements(undefined as any)).toHaveLength(0);
    expect(getArrayUniqueElements(0 as any as [])).toHaveLength(0);
    expect(getArrayUniqueElements(true as any as [])).toHaveLength(0);
    expect(getArrayUniqueElements('' as any as [])).toHaveLength(0);
    expect(getArrayUniqueElements({} as any as [])).toHaveLength(0);
  });

  it('should return array of same type', () => {
    const booleanArray: boolean[] = [true, false];
    getArrayUniqueElements(booleanArray).every(resultItem => expect(typeof resultItem).toBe('boolean'));

    const numberArray: number[] = [-Infinity, -2, -1, 0, 1, 2, Infinity];
    getArrayUniqueElements(numberArray).every(resultItem => expect(typeof resultItem).toBe('number'));

    const stringArray: string[] = ['aaa', 'bbb', 'ccc'];
    getArrayUniqueElements(stringArray).every(resultItem => expect(typeof resultItem).toBe('string'));

    const objectArray: (object & { id: number })[] = [{ id: 1 }, { id: 2 }, { id: 3 }];
    getArrayUniqueElements(objectArray, 'id').every(resultItem => expect(typeof resultItem).toBe('object'));

    const arrayArray: (object & { length: number })[] = [[], [], []];
    getArrayUniqueElements(arrayArray, 'length').every(resultItem => expect(typeof resultItem).toBe('object'));
  });

  it('should correctly remove primitive duplicates', () => {
    const booleanArray: boolean[] = [true, false, true, true];
    expect(getArrayUniqueElements(booleanArray)).toEqual([true, false]);

    const numberArray: number[] = [0, 0, 0, 0, 0, 1, 2, 3, 2, 1, 5, 6];
    expect(getArrayUniqueElements(numberArray)).toEqual([0, 1, 2, 3, 5, 6]);

    const stringArray: string[] = ['aaa', 'ccc', 'bbb', 'ccc'];
    expect(getArrayUniqueElements(stringArray)).toEqual(['aaa', 'ccc', 'bbb']);
  });

  it('should correctly keep first object in array with duplicates', () => {
    interface Element {
      id: number;
      type: TestEnum;
    }

    const objectArray: Element[] = [
      { id: 1, type: TestEnum.First },
      { id: 2, type: TestEnum.Second },
      { id: 3, type: TestEnum.Third },
      { id: 1, type: TestEnum.Third }
    ];

    const expected: Element[] = [
      { id: 1, type: TestEnum.First },
      { id: 2, type: TestEnum.Second },
      { id: 3, type: TestEnum.Third }
    ];

    expect(getArrayUniqueElements(objectArray, 'id')).toEqual(expected);
  });

  it('should correctly process enum values duplicates', () => {
    const enumValuesArray: TestEnum[] = [
      TestEnum.First,
      TestEnum.First,
      TestEnum.Second,
      TestEnum.First,
      TestEnum.Third,
      TestEnum.Third
    ];

    const result: TestEnum[] = getArrayUniqueElements<TestEnum>(enumValuesArray);
    const expected: TestEnum[] = [TestEnum.First, TestEnum.Second, TestEnum.Third];

    expect(result).toEqual(expected);
  });
});
