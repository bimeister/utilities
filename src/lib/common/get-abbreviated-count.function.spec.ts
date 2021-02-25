import { getAbbreviatedCount } from './get-abbreviated-count.function';

describe('get-abbreviated-count.function.ts', () => {
  const abbreviations: string[] = ['к', 'кк', 'млрд'];

  it('should return null if passed null, undefined or NaN ', () => {
    expect(getAbbreviatedCount(null)).toBeNull();
    expect(getAbbreviatedCount(undefined)).toBeNull();
    expect(getAbbreviatedCount(NaN)).toBeNull();
  });

  it('should return stringified 0 if passed 0', () => {
    expect(getAbbreviatedCount(0)).toBe('0');
  });

  it('should return stringified value if Math.abs(value) in range 1-999', () => {
    expect(getAbbreviatedCount(1)).toBe('1');
    expect(getAbbreviatedCount(500)).toBe('500');
    expect(getAbbreviatedCount(999)).toBe('999');
    expect(getAbbreviatedCount(-1)).toBe('-1');
    expect(getAbbreviatedCount(-500)).toBe('-500');
    expect(getAbbreviatedCount(-999)).toBe('-999');
  });

  it('should return stringified formatted value + abbreviations[0] if Math.abs(value) in range 999 - 999 999', () => {
    expect(getAbbreviatedCount(1000)).toBe(`1${abbreviations[0]}`);
    expect(getAbbreviatedCount(50000)).toBe(`50${abbreviations[0]}`);
    expect(getAbbreviatedCount(999999)).toBe(`999${abbreviations[0]}`);
    expect(getAbbreviatedCount(-1000)).toBe(`-1${abbreviations[0]}`);
    expect(getAbbreviatedCount(-50000)).toBe(`-50${abbreviations[0]}`);
    expect(getAbbreviatedCount(-999999)).toBe(`-999${abbreviations[0]}`);
  });

  it(`should return stringified formatted value +
  abbreviations[1] if Math.abs(value) in range 1 000 000 - 999 999 999`, () => {
    expect(getAbbreviatedCount(1000000)).toBe(`1${abbreviations[1]}`);
    expect(getAbbreviatedCount(50000000)).toBe(`50${abbreviations[1]}`);
    expect(getAbbreviatedCount(999999999)).toBe(`999${abbreviations[1]}`);
    expect(getAbbreviatedCount(-1000000)).toBe(`-1${abbreviations[1]}`);
    expect(getAbbreviatedCount(-50000000)).toBe(`-50${abbreviations[1]}`);
    expect(getAbbreviatedCount(-999999999)).toBe(`-999${abbreviations[1]}`);
  });

  it('should return stringified formatted value + abbreviations[2] if Math.abs(value) in range 999 999 999 - Number.MAX_SAFE_INTEGER', () => {
    expect(getAbbreviatedCount(1000000000)).toBe(`1${abbreviations[2]}`);
    expect(getAbbreviatedCount(50000000000)).toBe(`50${abbreviations[2]}`);
    expect(getAbbreviatedCount(9999999999999)).toBe(`9999${abbreviations[2]}`);
    expect(getAbbreviatedCount(-1000000000)).toBe(`-1${abbreviations[2]}`);
    expect(getAbbreviatedCount(-50000000000)).toBe(`-50${abbreviations[2]}`);
    expect(getAbbreviatedCount(-9999999999999)).toBe(`-9999${abbreviations[2]}`);
    expect(getAbbreviatedCount(Number.MAX_SAFE_INTEGER)).toBe(
      `${Math.floor(Number.MAX_SAFE_INTEGER / 1000000000)}${abbreviations[2]}`
    );
  });
});
