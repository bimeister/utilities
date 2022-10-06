import { mergeArraysByProperty } from "./merge-arrays-by-property.function";

describe("merge-arrays-by-property.function.ts", () => {
  it("should return merge arrays by property", () => {
    const arrayA = [
      {
        id: 1,
        type: "First type"
      },
      {
        id: 2,
        type: "First type"
      }];
    const arrayB = [
      {
        id: 2,
        type: "Second type"
      },
      {
        id: 3,
        type: "Third type"
      }];

    const expectedArray = [
      {
        id: 2,
        type: "Second type"
      },
      {
        id: 3,
        type: "Third type"
      },
      {
        id: 1,
        type: "First type"
      }
    ];

    expect(mergeArraysByProperty('type', arrayA, arrayB)).toEqual(expectedArray);
  });
});
