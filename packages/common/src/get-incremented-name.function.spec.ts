import { getIncrementedName } from './get-incremented-name.function';

const NAME_MOCK: string = 'sample-name';

describe('get-incremented-name.function.ts', () => {
  const nameSample: string = NAME_MOCK;
  const existingNameIncludesNameSample: string = `${NAME_MOCK}-1`;
  const incrementedNameSample: string = `${NAME_MOCK} (1)`;
  const incrementedTwiceNameSample: string = `${NAME_MOCK} (2)`;

  it('should not increment name if namespace is empty', () => {
    expect(getIncrementedName(nameSample)).toBe(nameSample);
  });

  it('should increment name if there is the same name in namespace', () => {
    expect(getIncrementedName(nameSample, [nameSample])).toBe(incrementedNameSample);
  });

  it('should not increment name if name in namespace includes sample name', () => {
    expect(getIncrementedName(nameSample, [existingNameIncludesNameSample])).toBe(nameSample);
  });

  it('should increment name if there is incremented name in namespace', () => {
    expect(getIncrementedName(nameSample, [nameSample, incrementedNameSample, nameSample])).toBe(incrementedTwiceNameSample);
  });

  it('should increment name if there is incremented name in namespace', () => {
    expect(getIncrementedName(nameSample, [nameSample, incrementedNameSample, `${NAME_MOCK} ()`])).toBe(incrementedTwiceNameSample);
  });
});
