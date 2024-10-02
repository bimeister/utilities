import { mergeArraysByProperty } from './merge-arrays-by-property.function';

interface TestI {
  id: number;
  type: string;
}

describe('merge-arrays-by-property.function.ts', () => {
  it('should return merge arrays by property', () => {
    const arrayA: TestI[] = [
      {
        id: 1,
        type: 'First type',
      },
      {
        id: 2,
        type: 'First type',
      },
    ];
    const arrayB: TestI[] = [
      {
        id: 2,
        type: 'Second type',
      },
      {
        id: 3,
        type: 'Third type',
      },
    ];

    const expectedArray: TestI[] = [
      {
        id: 2,
        type: 'Second type',
      },
      {
        id: 3,
        type: 'Third type',
      },
      {
        id: 1,
        type: 'First type',
      },
    ];

    expect(mergeArraysByProperty('type', arrayA, arrayB)).toEqual(expectedArray);
  });
});
