export const mergeArraysByProperty = <T>(property: string & keyof T, ...arrays: T[][]): T[] => {
  const resultCollection: Map<T[keyof T], T> = new Map<T[keyof T], T>();
  arrays.reverse();
  arrays.forEach((array: T[]) =>
    array.forEach((object: T) => {
      if (resultCollection.has(object[property])) {
        return;
      }
      resultCollection.set(object[property], object);
    })
  );
  return Array.from(resultCollection.values());
};
