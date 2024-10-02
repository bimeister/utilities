import { isObjectKeyUsed } from './is-object-key-used.function';

interface TestI {
  propertyOne: string;
  propertyTwo: string;
  propertyThree: string;
}

describe('is-object-key-used.function.ts', () => {
  it('should return false if arguments are invalid', () => {
    expect(isObjectKeyUsed('object' as any, 'key')).toBe(false);
    expect(isObjectKeyUsed({}, null)).toBe(false);
  });

  it('should return true if object contains key', () => {
    const object: TestI = {
      propertyOne: 'propertyOne',
      propertyTwo: 'propertyTwo',
      propertyThree: 'propertyThree',
    };
    expect(isObjectKeyUsed(object, 'propertyOne')).toBe(true);
  });

  it('should return false if object does not contain key', () => {
    const object: TestI = {
      propertyOne: 'propertyOne',
      propertyTwo: 'propertyTwo',
      propertyThree: 'propertyThree',
    };
    expect(isObjectKeyUsed(object, 'propertyFour')).toBe(false);
  });
});
