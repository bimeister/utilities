import { getScreamingSnakeCasedString } from './get-screaming-snake-cased-string.function';

describe('get-screaming-snake-cased-string.function.ts', () => {
  it('should return null if it is passed', () => {
    const input: string | null = null;
    expect(getScreamingSnakeCasedString(input)).toBe(input);
  });

  it('should return undefined if it is passed', () => {
    const input: string | undefined = undefined;
    expect(getScreamingSnakeCasedString(input)).toBe(input);
  });

  it('should return SAMPLE_TRANSLATION_KEY for sample translation key', () => {
    expect(getScreamingSnakeCasedString('sample translation key')).toBe('SAMPLE_TRANSLATION_KEY');
  });

  it('should return SAMPLE_TRANSLATION_KEY for sample-translation-key', () => {
    expect(getScreamingSnakeCasedString('sample-translation-key')).toBe('SAMPLE_TRANSLATION_KEY');
  });

  it('should return SAMPLE_TRANSLATION_KEY for sampleTranslationKey', () => {
    expect(getScreamingSnakeCasedString('sampleTranslationKey')).toBe('SAMPLE_TRANSLATION_KEY');
  });

  it('should return GROUPED.SAMPLE_TRANSLATION_KEY for grouped.sampleTranslationKey', () => {
    expect(getScreamingSnakeCasedString('grouped.sampleTranslationKey')).toBe('GROUPED.SAMPLE_TRANSLATION_KEY');
  });

  it('should return NESTED.GROUPED.SAMPLE_TRANSLATION_KEY for nested.grouped.sampleTranslationKey', () => {
    expect(getScreamingSnakeCasedString('nested.grouped.sampleTranslationKey')).toBe(
      'NESTED.GROUPED.SAMPLE_TRANSLATION_KEY'
    );
  });
});
