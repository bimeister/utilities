/**
 * Generates an array of numbers within a specified range.
 *
 * @param {number} start - The starting value of the range (inclusive).
 * @param {number} end - The ending value of the range (inclusive).
 * @param {number} [step=1] - The value to increment by on each iteration. Must be a positive number.
 * @returns {number[]} An array of numbers from `start` to `end` (inclusive), incremented by `step`.
 *
 * @throws {Error} If `step` is not a positive number.
 *
 * @example
 * range(1, 5); // [1, 2, 3, 4, 5]
 * range(0, 10, 2); // [0, 2, 4, 6, 8, 10]
 */
export function range(start: number, end: number, step: number = 1): number[] {
  if (step <= 0) {
    throw new Error('[range] Step must be a positive number.');
  }

  const result: number[] = [];

  for (let i: number = start; i <= end; i += step) {
    result.push(i);
  }

  return result;
}
