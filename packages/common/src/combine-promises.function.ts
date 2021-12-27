export function combinePromises<T>(promiseArray: Promise<T>[]): Promise<T[]> {
  const result: Promise<T[]> = promiseArray.reduce(async (accumulator: Promise<T[]>, currentPart: Promise<T>) => {
    const updatedAccumulator: Promise<T[]> = currentPart.then((currentPartData: T) =>
      accumulator.then((accumulatedData: T[]) => Promise.resolve([...accumulatedData, currentPartData]))
    );

    return updatedAccumulator;
  }, Promise.resolve([]));

  return result;
}
