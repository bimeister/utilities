import { mapArrayToKeySet } from './map-array-to-key-set.function';

describe('map-array-to-key-set.function.ts', () => {
  it('should return an empty Set if the input array is empty', () => {
    const result: Set<never> = mapArrayToKeySet([], 'key');
    expect(result.size).toBe(0);
  });

  it('should correctly collect the keys from the array elements into a Set', () => {
    const array: { id: number; name: string }[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
    const result: Set<number> = mapArrayToKeySet(array, 'id');
    expect(result.size).toBe(3);
    expect(result.has(1)).toBe(true);
    expect(result.has(2)).toBe(true);
    expect(result.has(3)).toBe(true);
  });

  it('should handle arrays with duplicate keys correctly by storing unique keys only', () => {
    const array: { id: number; name: string }[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Charlie' },
    ];
    const result: Set<number> = mapArrayToKeySet(array, 'id');
    expect(result.size).toBe(2);
    expect(result.has(1)).toBe(true);
    expect(result.has(2)).toBe(true);
  });

  it('should work with keys of different types', () => {
    const array: { id: number; name: string }[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
    const resultNames: Set<string> = mapArrayToKeySet(array, 'name');
    expect(resultNames.size).toBe(3);
    expect(resultNames.has('Alice')).toBe(true);
    expect(resultNames.has('Bob')).toBe(true);
    expect(resultNames.has('Charlie')).toBe(true);
  });

  it('should filter out null and undefined values when ignoreNils is true', () => {
    const array: { id: number; name: string | null | undefined }[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: null },
      { id: 3, name: undefined },
    ];
    const result: Set<string> = mapArrayToKeySet(array, 'name', true);
    expect(result.size).toBe(1);
    expect(result.has('Alice')).toBe(true);
  });

  it('should include null and undefined values when ignoreNils is false', () => {
    const array: { id: number; name: string | null | undefined }[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: null },
      { id: 3, name: undefined },
    ];
    const result: Set<string | null | undefined> = mapArrayToKeySet(array, 'name', false);
    expect(result.size).toBe(3);
    expect(result.has('Alice')).toBe(true);
    expect(result.has(null)).toBe(true);
    expect(result.has(undefined)).toBe(true);
  });
});
