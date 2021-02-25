export function getClampedValue(value: number, min: number, max: number): number | undefined {
  if (typeof value !== 'number') {
    return undefined;
  }

  return Math.max(min, Math.min(value, max));
}
