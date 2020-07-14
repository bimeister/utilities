import { incrementName } from './increment-name.function';

const NAME_MOCK: string = 'sample-name';

describe('increment-name.function.ts', () => {
  const nameSample: string = NAME_MOCK;
  const existingNameIncludesNameSample: string = `${NAME_MOCK}-1`;
  const incrementedNameSample: string = `${NAME_MOCK} (1)`;
  const incrementedTwiceNameSample: string = `${NAME_MOCK} (2)`;

  it('should not increment name if namespace is empty', () => {
    expect(incrementName(nameSample)).toBe(nameSample);
  });

  it('should increment name if there is the same name in namespace', () => {
    expect(incrementName(nameSample, [nameSample])).toBe(incrementedNameSample);
  });

  it('should not increment name if name in namespace includes sample name', () => {
    expect(incrementName(nameSample, [existingNameIncludesNameSample])).toBe(nameSample);
  });

  it('should increment name if there is incremented name in namespace', () => {
    expect(incrementName(nameSample, [nameSample, incrementedNameSample])).toBe(incrementedTwiceNameSample);
  });
});
