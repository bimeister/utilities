import { getReversedArray } from "./get-reversed-array.function";

describe("get-reversed-array.function.ts", () => {
  it("should return reserved array", () => {
    const received: number[] = [1, 2, 3];
    const expected: number[] = [3, 2, 1];
    expect(getReversedArray(received)).toEqual(expected);
  });

  it("should return empty array if argument is empty array", () => {
    expect(getReversedArray([])).toEqual([]);
  });
});
