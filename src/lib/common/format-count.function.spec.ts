import { formatCount } from './format-count.function';

describe('format-count.function.ts', () => {
  const abbreviations: string[] = ['к', 'кк', 'млрд'];

  it('should return passed value if passed null or undefined ', () => {
    expect(formatCount(null)).toBeNull();
    expect(formatCount(undefined)).toBeUndefined();
  });

  it('should return stringified 0 if passed 0', () => {
    expect(formatCount(0)).toBe('0');
  });

  it('should return stringified value if Math.abs(value) in range 1-999', () => {
    expect(formatCount(1)).toBe('1');
    expect(formatCount(500)).toBe('500');
    expect(formatCount(999)).toBe('999');
    expect(formatCount(-1)).toBe('-1');
    expect(formatCount(-500)).toBe('-500');
    expect(formatCount(-999)).toBe('-999');
  });

  it('should return stringified formatted value + abbreviations[0] if Math.abs(value) in range 999 - 999 999', () => {
    expect(formatCount(1000)).toBe(`1${abbreviations[0]}`);
    expect(formatCount(50000)).toBe(`50${abbreviations[0]}`);
    expect(formatCount(999999)).toBe(`999${abbreviations[0]}`);
    expect(formatCount(-1000)).toBe(`-1${abbreviations[0]}`);
    expect(formatCount(-50000)).toBe(`-50${abbreviations[0]}`);
    expect(formatCount(-999999)).toBe(`-999${abbreviations[0]}`);
  });

  it(`should return stringified formatted value +
  abbreviations[1] if Math.abs(value) in range 1 000 000 - 999 999 999`, () => {
    expect(formatCount(1000000)).toBe(`1${abbreviations[1]}`);
    expect(formatCount(50000000)).toBe(`50${abbreviations[1]}`);
    expect(formatCount(999999999)).toBe(`999${abbreviations[1]}`);
    expect(formatCount(-1000000)).toBe(`-1${abbreviations[1]}`);
    expect(formatCount(-50000000)).toBe(`-50${abbreviations[1]}`);
    expect(formatCount(-999999999)).toBe(`-999${abbreviations[1]}`);
  });

  it('should return stringified formatted value + abbreviations[2] if Math.abs(value) in range 999 999 999 - Number.MAX_SAFE_INTEGER', () => {
    expect(formatCount(1000000000)).toBe(`1${abbreviations[2]}`);
    expect(formatCount(50000000000)).toBe(`50${abbreviations[2]}`);
    expect(formatCount(9999999999999)).toBe(`9999${abbreviations[2]}`);
    expect(formatCount(-1000000000)).toBe(`-1${abbreviations[2]}`);
    expect(formatCount(-50000000000)).toBe(`-50${abbreviations[2]}`);
    expect(formatCount(-9999999999999)).toBe(`-9999${abbreviations[2]}`);
    expect(formatCount(Number.MAX_SAFE_INTEGER)).toBe(
      `${Math.floor(Number.MAX_SAFE_INTEGER / 1000000000)}${abbreviations[2]}`
    );
  });
});
