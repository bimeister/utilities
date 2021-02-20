import { isNil } from './is-nil.function';

const abbreviations: string[] = ['к', 'кк', 'млрд'];

export function formatCount(count: number): string {
  if (isNil(count)) {
    return count;
  }

  if (count === 0) {
    return String(count);
  }

  const delimiter: number = 1000;
  const absoluteCount: number = Math.abs(count);

  const isPositive: boolean = count > 0;

  const base: number = Math.min(Math.floor(Math.log(absoluteCount) / Math.log(delimiter)), abbreviations.length);
  const suffix: string = abbreviations[Math.min(abbreviations.length - 1, base - 1)];

  const precision: number = 1;

  const raisedDelimiter: number = Math.pow(delimiter, base);

  const roundedCount: number = Math.floor((absoluteCount / raisedDelimiter) * precision) / precision;

  const result: string = isPositive ? String(roundedCount) : `-${String(roundedCount)}`;

  return isNil(suffix) ? result : `${result}${suffix}`;
}
