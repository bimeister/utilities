import { getShuffledArray } from "./get-shuffled-array.function";

describe("get-shuffled-array.function.ts", () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  })

  it("should return empty array if argument is invalid", () => {
    expect(getShuffledArray([])).toEqual([]);
    expect(getShuffledArray(null as any)).toEqual([]);
  });

  it("should return shuffled array", () => {
    expect(getShuffledArray([1, 2, 3])).toEqual([3, 2, 1]);
  });
});
