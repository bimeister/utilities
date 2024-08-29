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
});
