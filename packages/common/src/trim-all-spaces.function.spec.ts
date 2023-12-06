import { trimAllSpaces } from './trim-all-spaces.function';

describe('trim-all-spaces.function.ts', () => {
  it('should trim leading and trailing spaces', () => {
    const text: string = '   example   ';
    expect(trimAllSpaces(text)).toBe('example');
  });

  it('should replace multiple consecutive spaces with a single space', () => {
    const text: string = '   this   is    a    test   ';
    expect(trimAllSpaces(text)).toBe('this is a test');
  });

  it('should handle empty string', () => {
    const text: string = '';
    expect(trimAllSpaces(text)).toBe('');
  });

  it('should handle string with only spaces', () => {
    const text: string = '     ';
    expect(trimAllSpaces(text)).toBe('');
  });
});
