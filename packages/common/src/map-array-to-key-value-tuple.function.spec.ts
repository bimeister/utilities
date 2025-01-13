import { Nullable } from '@bimeister/utilities.types';
import { mapArrayToKeyValueTuple } from './map-array-to-key-value-tuple.function';

describe('map-array-to-key-value-tuples.function.ts', () => {
  it('should return an empty array if the input array is empty', () => {
    const result: [never, never][] = mapArrayToKeyValueTuple([], 'key');
    expect(result.length).toBe(0);
  });

  it('should correctly map the array elements to key-value tuples', () => {
    const array: { id: number; name: string }[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
    const result: [number, { id: number; name: string }][] = mapArrayToKeyValueTuple(array, 'id');
    expect(result).toEqual([
      [1, { id: 1, name: 'Alice' }],
      [2, { id: 2, name: 'Bob' }],
      [3, { id: 3, name: 'Charlie' }],
    ]);
  });

  it('should exclude `null` and `undefined` keys when ignoreNils is true', () => {
    const array: { id: Nullable<number>; name: string }[] = [
      { id: 1, name: 'Alice' },
      { id: null, name: 'Bob' },
      { id: 3, name: 'Charlie' },
      { id: undefined, name: 'Diana' },
    ];
    const result: [number, { id: Nullable<number>; name: string }][] = mapArrayToKeyValueTuple(array, 'id', true);
    expect(result).toEqual([
      [1, { id: 1, name: 'Alice' }],
      [3, { id: 3, name: 'Charlie' }],
    ]);
  });

  it('should include `null` and `undefined` keys when ignoreNils is false', () => {
    const array: { id: Nullable<number>; name: string }[] = [
      { id: 1, name: 'Alice' },
      { id: null, name: 'Bob' },
      { id: 3, name: 'Charlie' },
      { id: undefined, name: 'Diana' },
    ];
    const result: [Nullable<number>, { id: Nullable<number>; name: string }][] = mapArrayToKeyValueTuple(
      array,
      'id',
      false
    );
    expect(result).toEqual([
      [1, { id: 1, name: 'Alice' }],
      [null, { id: null, name: 'Bob' }],
      [3, { id: 3, name: 'Charlie' }],
      [undefined, { id: undefined, name: 'Diana' }],
    ]);
  });

  it('should handle arrays with duplicate keys correctly', () => {
    const array: { id: number; name: string }[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Charlie' },
    ];
    const result: [number, { id: number; name: string }][] = mapArrayToKeyValueTuple(array, 'id');
    expect(result).toEqual([
      [1, { id: 1, name: 'Alice' }],
      [2, { id: 2, name: 'Bob' }],
      [1, { id: 1, name: 'Charlie' }],
    ]);
  });
});
