import { getArraysDifference } from './get-arrays-difference.function';
import type { Primitive } from '@bimeister/utilities.types';

describe('get-arrays-difference.function.ts', () => {
  it('should return array with difference values between two arrays', () => {
    expect(getArraysDifference(['a', 'b', 'c'], ['a', 'b'])).toEqual(['c']);
    expect(getArraysDifference([true, false], [true])).toEqual([false]);
    expect(getArraysDifference([1, 2, 3], [1, 2])).toEqual([3]);
  });

  it('should return array with difference values between two arrays by key', () => {
    const arrayA: object[] = [
      { id: 1, type: 'one' },
      { id: 2, type: 'one' },
      { id: 3, type: 'two' },
      { id: 5, type: 'two' }
    ];

    const arrayB: object[] = [
      { id: 1, type: 'one' },
      { id: 2, type: 'one' },
      { id: 3, type: 'three' }
    ];

    const expected: object[] = [{ id: 5, type: 'two' }];

    expect(getArraysDifference(arrayA, arrayB, 'id')).toEqual(expected);
  });
  it('should return array with difference values between two arrays', () => {
    const arrayA: null[] = [null];

    const arrayB: object[] = [{ number: 1, property: 'one' }];

    expect(getArraysDifference(arrayA, arrayB as unknown as Primitive[])).toEqual([null]);
  });

  it('should return empty array with different type of elements', () => {
    const arrayA: object[] = [
      { key: 1, type: 'one' },
      { id: 2, type: 'one' }
    ];

    const arrayB: object[] = [
      { id: 1, type: 'one' },
      { id: 2, type: 'one' },
      { id: 3, type: 'three' }
    ];

    const expected: object[] = [];

    expect(getArraysDifference(arrayA, arrayB, 'id')).toEqual(expected);
  });
});
