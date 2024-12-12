import { Nullable } from '@bimeister/utilities.types';
import { mapArrayToKeyValueMap } from './map-array-to-key-value-map.function';

describe('map-array-to-key-value-map.function.ts', () => {
  it('should return an empty Map if the input array is empty', () => {
    const result: Map<never, never> = mapArrayToKeyValueMap([], 'key');
    expect(result.size).toBe(0);
  });

  it('should correctly map the array elements to key-value pairs in the Map', () => {
    const array: { id: number; name: string }[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
    const result: Map<number, { id: number; name: string }> = mapArrayToKeyValueMap(array, 'id');
    expect(result.size).toBe(3);
    expect(result.get(1)).toEqual({ id: 1, name: 'Alice' });
    expect(result.get(2)).toEqual({ id: 2, name: 'Bob' });
    expect(result.get(3)).toEqual({ id: 3, name: 'Charlie' });
  });

  it('should handle arrays with duplicate keys correctly', () => {
    const array: { id: number; name: string }[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Charlie' },
    ];
    const result: Map<number, { id: number; name: string }> = mapArrayToKeyValueMap(array, 'id');
    expect(result.size).toBe(2);
    expect(result.get(1)).toEqual({ id: 1, name: 'Charlie' });
    expect(result.get(2)).toEqual({ id: 2, name: 'Bob' });
  });

  it('should exclude `null` and `undefined` keys when ignoreNils is true', () => {
    const array: { id: Nullable<number>; name: string }[] = [
      { id: 1, name: 'Alice' },
      { id: null, name: 'Bob' },
      { id: 3, name: 'Charlie' },
      { id: undefined, name: 'Diana' },
    ];
    const result: Map<number, { id: Nullable<number>; name: string }> = mapArrayToKeyValueMap(array, 'id', true);
    expect(result.size).toBe(2);
    expect(result.get(1)).toEqual({ id: 1, name: 'Alice' });
    expect(result.get(3)).toEqual({ id: 3, name: 'Charlie' });
    expect(result.has(null as any)).toBe(false);
    expect(result.has(undefined as any)).toBe(false);
  });

  it('should include `null` and `undefined` keys when ignoreNils is false', () => {
    const array: { id: Nullable<number>; name: string }[] = [
      { id: 1, name: 'Alice' },
      { id: null, name: 'Bob' },
      { id: 3, name: 'Charlie' },
      { id: undefined, name: 'Diana' },
    ];
    const result: Map<Nullable<number>, { id: Nullable<number>; name: string }> = mapArrayToKeyValueMap(
      array,
      'id',
      false
    );
    expect(result.size).toBe(4);
    expect(result.get(1)).toEqual({ id: 1, name: 'Alice' });
    expect(result.get(null)).toEqual({ id: null, name: 'Bob' });
    expect(result.get(3)).toEqual({ id: 3, name: 'Charlie' });
    expect(result.get(undefined)).toEqual({ id: undefined, name: 'Diana' });
  });
});
