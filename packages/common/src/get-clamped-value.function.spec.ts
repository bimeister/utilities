import { getClampedValue } from './get-clamped-value.function';

describe('get-clamped-value.function.ts', () => {
  const minValue: number = 10;
  const maxValue: number = 100;

  it('should return number if includes in min max values', () => {
    expect(getClampedValue(15, minValue, maxValue)).toEqual(15);
  });

  it('should return maxValue if input value more then max', () => {
    expect(getClampedValue(110, minValue, maxValue)).toEqual(maxValue);
  });

  it('should return minValue if input value less then min', () => {
    expect(getClampedValue(-110, minValue, maxValue)).toEqual(minValue);
  });

  it('should return minValue if input is -Infinity', () => {
    expect(getClampedValue(-Infinity, minValue, maxValue)).toEqual(minValue);
  });

  it('should return maxValue if input is Infinity', () => {
    expect(getClampedValue(Infinity, minValue, maxValue)).toEqual(maxValue);
  });

  it('should return undefined if input value is nil', () => {
    expect(getClampedValue(null, minValue, maxValue)).toBeUndefined();
    expect(getClampedValue(undefined, minValue, maxValue)).toBeUndefined();
  });
});
