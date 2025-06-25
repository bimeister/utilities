import { range } from './range.function';

describe('range', () => {
  it('returns array with default step = 1', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('returns array with custom positive step', () => {
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8, 10]);
    expect(range(1, 9, 3)).toEqual([1, 4, 7]);
  });

  it('returns empty array if start > end', () => {
    expect(range(10, 5)).toEqual([]);
    expect(range(2, 1)).toEqual([]);
  });

  it('returns array with one element if start === end', () => {
    expect(range(5, 5)).toEqual([5]);
  });

  it('returns correct result if step is greater than the range', () => {
    expect(range(1, 5, 10)).toEqual([1]);
  });

  it('returns correct result if step equals difference between start and end', () => {
    expect(range(1, 5, 4)).toEqual([1, 5]);
  });

  it('throws an error if step is zero', () => {
    expect(() => range(1, 5, 0)).toThrow('Step must be a positive number.');
  });

  it('throws an error if step is negative', () => {
    expect(() => range(5, 1, -1)).toThrow('Step must be a positive number.');
  });
});
