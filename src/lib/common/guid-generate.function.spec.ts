import { REGEXP_PATTERNS } from './../../internal/constants/regexp-patterns.const';
import { guidGenerate } from './guid-generate.function';

describe('guid-generate.function.ts', () => {
  it('should return uuid-formatted string', () => {
    const uuidFormatRegExp: RegExp = REGEXP_PATTERNS.uuid;
    expect(uuidFormatRegExp.test(guidGenerate())).toBe(true);
  });

  it('should return different results', () => {
    const runs: number = 1000;
    const resultSet: Set<string> = new Set<string>();
    new Array(runs).fill(null).forEach(() => resultSet.add(guidGenerate()));
    expect(resultSet.size).toBe(runs);
  });
});
