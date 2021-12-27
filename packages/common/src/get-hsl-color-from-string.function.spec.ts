import type { HslColor } from '@workspaces/interfaces';
import { getHslColorFromString } from './get-hsl-color-from-string.function';

const DEFAULT_HSL_COLOR: HslColor = { h: 87, s: 50, l: 50 };

describe('get-hsl-color-from-string.function.ts', () => {
  const defaultString: string = 'admin';

  it('should return default color if input is nil type', () => {
    expect(getHslColorFromString(null as any)).toEqual(DEFAULT_HSL_COLOR);
    expect(getHslColorFromString(undefined as any)).toEqual(DEFAULT_HSL_COLOR);
  });

  it('should return default saturation if input saturation is nil or NaN', () => {
    expect(getHslColorFromString(defaultString, null as any).s).toEqual(DEFAULT_HSL_COLOR.s);
    expect(getHslColorFromString(defaultString, undefined).s).toEqual(DEFAULT_HSL_COLOR.s);
    expect(getHslColorFromString(defaultString, NaN).s).toEqual(DEFAULT_HSL_COLOR.s);
  });

  it('should return default lightness if input lightness is nil or NaN', () => {
    expect(getHslColorFromString(defaultString, DEFAULT_HSL_COLOR.s, null as any).l).toEqual(DEFAULT_HSL_COLOR.l);
    expect(getHslColorFromString(defaultString, DEFAULT_HSL_COLOR.s, undefined).l).toEqual(DEFAULT_HSL_COLOR.l);
    expect(getHslColorFromString(defaultString, DEFAULT_HSL_COLOR.s, NaN).l).toEqual(DEFAULT_HSL_COLOR.l);
  });

  it('should return clamped saturation in [0, 100]', () => {
    expect(getHslColorFromString(defaultString, 0).s).toEqual(0);
    expect(getHslColorFromString(defaultString, 100).s).toEqual(100);
    expect(getHslColorFromString(defaultString, -20).s).toEqual(0);
    expect(getHslColorFromString(defaultString, 120).s).toEqual(100);
    expect(getHslColorFromString(defaultString, Infinity).s).toEqual(100);
    expect(getHslColorFromString(defaultString, -Infinity).s).toEqual(0);
  });

  it('should return clamped lightness in [0, 100]', () => {
    expect(getHslColorFromString(defaultString, DEFAULT_HSL_COLOR.s, 0).l).toEqual(0);
    expect(getHslColorFromString(defaultString, DEFAULT_HSL_COLOR.s, 100).l).toEqual(100);
    expect(getHslColorFromString(defaultString, DEFAULT_HSL_COLOR.s, -20).l).toEqual(0);
    expect(getHslColorFromString(defaultString, DEFAULT_HSL_COLOR.s, 120).l).toEqual(100);
    expect(getHslColorFromString(defaultString, DEFAULT_HSL_COLOR.s, Infinity).l).toEqual(100);
    expect(getHslColorFromString(defaultString, DEFAULT_HSL_COLOR.s, -Infinity).l).toEqual(0);
  });

  it('should return hash 71 if input string is "admin", includes in [-360, 360] interval', () => {
    const returnedHash: number = getHslColorFromString('admin').h;
    expect(returnedHash).toEqual(71);
    expect(returnedHash).toBeLessThanOrEqual(360);
    expect(returnedHash).toBeGreaterThanOrEqual(-360);
  });

  it('should return hash -122 if input string is "admin admin", includes in [-360, 360] interval', () => {
    const returnedHash: number = getHslColorFromString('admin admin').h;
    expect(returnedHash).toEqual(-122);
    expect(returnedHash).toBeLessThanOrEqual(360);
    expect(returnedHash).toBeGreaterThanOrEqual(-360);
  });

  it('should return -267 if input string is "admin admin admin", includes in [-360, 360] interval', () => {
    const returnedHash: number = getHslColorFromString('admin admin admin').h;
    expect(returnedHash).toEqual(-267);
    expect(returnedHash).toBeLessThanOrEqual(360);
    expect(returnedHash).toBeGreaterThanOrEqual(-360);
  });

  it('should return -344 if input string is "ZZZZZZZZZZ", includes in [-360, 360] interval', () => {
    const returnedHash: number = getHslColorFromString('ZZZZZZZZZZ').h;
    expect(returnedHash).toEqual(-344);
    expect(returnedHash).toBeLessThanOrEqual(360);
    expect(returnedHash).toBeGreaterThanOrEqual(-360);
  });
});
