import { stringFilterPredicate } from "./string-filter-predicate.function";

describe("string-filter-predicate.function.ts", () => {
  it("should return true if targetValue includes filterValue", () => {
    const targetValue: string = 'target value';
    const filterValue: string = 'value';
    expect(stringFilterPredicate(targetValue, filterValue)).toBe(true);
  });

  it("should return false if targetValue does not include filterValue", () => {
    const targetValue: string = 'target value';
    const filterValue: string = 'filter';
    expect(stringFilterPredicate(targetValue, filterValue)).toBe(false);
  });
});
