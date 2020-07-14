import { getRegExpPattern } from './get-reg-exp-pattern.function';
import { getUuid } from './get-uuid.function';

describe('get-uuid.function.ts', () => {
  it('should return uuid-formatted string', () => {
    const uuidFormatRegExp: RegExp = getRegExpPattern('uuid');
    expect(uuidFormatRegExp.test(getUuid())).toBe(true);
  });

  it('should return different results', () => {
    const runs: number = 1000;
    const resultSet: Set<string> = new Set<string>();
    new Array(runs).fill(null).forEach(() => resultSet.add(getUuid()));
    expect(resultSet.size).toBe(runs);
  });
});
