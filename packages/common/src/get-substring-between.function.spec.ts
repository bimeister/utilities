import { getSubstringBetween } from './get-substring-between.function';
import { getUuid } from './get-uuid.function';

describe('get-substring-between.function.ts', () => {
  it('should return original string if no patterns are set', () => {
    const original: string = getUuid();

    expect(getSubstringBetween(original, {})).toBe(original);
  });

  it('should return processed string if drop pattern is set (left)', () => {
    const original: string = '/utilities/packages/common/src/get-substring-between.function.ts';
    const target: string = '/get-substring-between.function.ts';
    const dropLeftPattern: RegExp = new RegExp(/^.*\/src/gm);

    expect(getSubstringBetween(original, { dropLeftPattern })).toBe(target);
  });

  it('should return processed string if drop pattern is set (right)', () => {
    const original: string = '/utilities/packages/common/src/get-substring-between.function.ts';
    const target: string = '/utilities/packages/common/src';
    const dropRightPattern: RegExp = new RegExp(/\/[\w-]*\.function\.ts$/gm);

    expect(getSubstringBetween(original, { dropRightPattern })).toBe(target);
  });

  it('should return processed string if drop pattern is set (left & right)', () => {
    const original: string = '/utilities/packages/common/src/get-substring-between.function.ts';
    const target: string = 'src';
    const dropLeftPattern: RegExp = new RegExp(/^\/\w*\/\w*\/\w*\//gm);
    const dropRightPattern: RegExp = new RegExp(/\/[\w-]*\.function\.ts$/gm);

    expect(getSubstringBetween(original, { dropLeftPattern, dropRightPattern })).toBe(target);
  });
});
