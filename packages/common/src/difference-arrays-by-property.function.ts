import { isNil } from './is-nil.function';

export function differenceArraysByProperty<T>(arrayOne: T[], arrayTwo: T[], property: string): T[] {
  const resultCollection: Map<any, T> = new Map<any, T>();
  arrayOne
    .filter((object: T) => !isNil(object[property]))
    .forEach((object: T) => {
      resultCollection.set(object[property], object);
    });
  arrayTwo
    .filter((object: T) => !isNil(object[property]))
    .forEach((object: T) => {
      if (!resultCollection.has(object[property])) {
        return;
      }
      resultCollection.delete(object[property]);
    });
  return Array.from(resultCollection.values());
}
