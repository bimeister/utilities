import { getArraysDifference } from "./get-arrays-difference.function";

describe("get-arrays-difference.function.ts", () => {
  it("should return array with difference values between two arrays", () => {
    expect(getArraysDifference(["a", "b", "c"], ["a", "b"])).toEqual(["c"]);
    expect(getArraysDifference([true, false], [true])).toEqual([false]);
    expect(getArraysDifference([1, 2, 3], [1, 2])).toEqual([3]);
  });

  it("should return array with difference values between two arrays by key", () => {
    const arrayA: any = [
      { id: 1, type: "one" },
      { id: 2, type: "one" },
      { id: 3, type: "two" },
      { id: 5, type: "two" }
    ];

    const arrayB: any = [
      { id: 1, type: "one" },
      { id: 2, type: "one" },
      { id: 3, type: "three" }
    ];

    const expected: any = [
      { id: 5, type: "two" }
    ];

    expect(getArraysDifference(arrayA, arrayB, "id")).toEqual(expected);
  });
  it("should return array with difference values between two arrays", () => {
    const arrayA: any = [null];

    const arrayB: any = [
      { number: 1, property: "one" }
    ];

    const expected: any = new Map();
    expected.set(arrayA[0], arrayA[0]);

    expect(getArraysDifference(arrayA, arrayB)).toEqual([null]);
  });

  it("should return empty array with difference type of elements", () => {
    const arrayA: any = [
      { key: 1, type: "one" },
      { id: 2, type: "one" },
    ];

    const arrayB: any = [
      { id: 1, type: "one" },
      { id: 2, type: "one" },
      { id: 3, type: "three" }
    ];

    const expected: any = [];

    expect(getArraysDifference(arrayA, arrayB, "id")).toEqual(expected);
  });

});
