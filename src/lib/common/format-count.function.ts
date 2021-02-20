import { isNil } from './is-nil.function';

const abbreviationByRank: Map<number, string> = new Map<number, string>([
  [1, 'к'],
  [2, 'кк'],
  [3, 'млрд']
]);
export function formatCount(count: number): string {
  if (isNaN(count) || typeof count !== 'number') {
    return null;
  }

  if (count === 0) {
    return '0';
  }

  const delimiter: number = 1000;
  const absoluteCount: number = Math.abs(count);

  const isPositive: boolean = count > 0;

  const base: number = Math.min(Math.floor(Math.log(absoluteCount) / Math.log(delimiter)), abbreviationByRank.size);
  const suffix: string = abbreviationByRank.get(base);

  const precision: number = 1;

  const raisedDelimiter: number = Math.pow(delimiter, base);

  const roundedCount: number = Math.floor((absoluteCount / raisedDelimiter) * precision) / precision;

  const result: string = isPositive ? String(roundedCount) : `-${String(roundedCount)}`;

  return isNil(suffix) ? result : `${result}${suffix}`;
}
