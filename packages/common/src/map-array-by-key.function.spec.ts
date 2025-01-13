import { Nullable } from '@bimeister/utilities.types';
import { mapArrayByKey } from './map-array-by-key.function';

describe('map-array-by-key.function.ts', () => {
  it('should return an empty array if the input array is empty', () => {
    const result: never[] = mapArrayByKey([], 'key');
    expect(result).toEqual([]);
  });

  it('should correctly collect values by the specified key', () => {
    const array: { id: number; name: string }[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Charlie' },
    ];
    const result: number[] = mapArrayByKey(array, 'id');
    expect(result).toEqual([1, 2, 1]);
  });

  it('should exclude `null` and `undefined` values when ignoreNils is true', () => {
    const array: { id: Nullable<number>; name: string }[] = [
      { id: 1, name: 'Alice' },
      { id: null, name: 'Bob' },
      { id: 3, name: 'Charlie' },
      { id: undefined, name: 'Diana' },
    ];
    const result: number[] = mapArrayByKey(array, 'id', true);
    expect(result).toEqual([1, 3]);
  });

  it('should include `null` and `undefined` values when ignoreNils is false', () => {
    const array: { id: Nullable<number>; name: string }[] = [
      { id: 1, name: 'Alice' },
      { id: null, name: 'Bob' },
      { id: 3, name: 'Charlie' },
      { id: undefined, name: 'Diana' },
    ];
    const result: Nullable<number>[] = mapArrayByKey(array, 'id', false);
    expect(result).toEqual([1, null, 3, undefined]);
  });
});
