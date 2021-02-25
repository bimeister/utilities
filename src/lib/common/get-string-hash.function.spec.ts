import { getStringHash } from './get-string-hash.function';

describe('get-string-hash.function.ts', () => {
  it('should return 0 if input is empty string', () => {
    expect(getStringHash('')).toEqual(0);
  });

  it('should return 92668751 if input is "admin"', () => {
    expect(getStringHash('admin')).toEqual(92668751);
  });

  it('should return -1964694722 if input is "admin admin"', () => {
    expect(getStringHash('admin admin')).toEqual(-1964694722);
  });

  it('should return -1860021267 if input is "admin admin admin"', () => {
    expect(getStringHash('admin admin admin')).toEqual(-1860021267);
  });

  it('should return -1095886784 if input is "ZZZZZZZZZZ"', () => {
    expect(getStringHash('ZZZZZZZZZZ')).toEqual(-1095886784);
  });

  it('should return undefined if input value is nil', () => {
    expect(getStringHash(null)).toBeUndefined();
    expect(getStringHash(undefined)).toBeUndefined();
  });
});
