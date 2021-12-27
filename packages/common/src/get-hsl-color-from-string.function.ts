import type { HslColor } from '@workspaces/interfaces';
import { getClampedValue } from './get-clamped-value.function';
import { getStringHash } from './get-string-hash.function';
import { isNil } from './is-nil.function';

const DEFAULT_HSL_COLOR: HslColor = { h: 87, s: 50, l: 50 };
const MAX_VALUE: number = 100;
const MIN_VALUE: number = 0;

export function getHslColorFromString(
  inputString: string,
  saturation: number = DEFAULT_HSL_COLOR.s,
  lightness: number = DEFAULT_HSL_COLOR.l
): HslColor {
  if (typeof inputString !== 'string') {
    return DEFAULT_HSL_COLOR;
  }

  const isSaturationIncorrect: boolean = isNil(saturation) || Number.isNaN(saturation);
  const isLightnessIncorrect: boolean = isNil(lightness) || Number.isNaN(lightness);

  const serializedSaturation: number | undefined = isSaturationIncorrect
    ? DEFAULT_HSL_COLOR.s
    : getClampedValue(saturation, MIN_VALUE, MAX_VALUE);
  const serializedLightness: number | undefined = isLightnessIncorrect
    ? DEFAULT_HSL_COLOR.l
    : getClampedValue(lightness, MIN_VALUE, MAX_VALUE);

  const hash: number | undefined = getStringHash(inputString);

  if (isNil(hash) || isNil(serializedSaturation) || isNil(serializedLightness)) {
    return DEFAULT_HSL_COLOR;
  }

  /** get value form interval [-360, 360] */
  const serializedHash: number = hash % 360;

  return { h: serializedHash, s: serializedSaturation, l: serializedLightness };
}
