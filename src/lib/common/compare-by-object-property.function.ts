import { isNil } from './is-nil.function';

export function compareByObjectProperty(
  propertyName: string,
  valueConverter?: <K, V>(value: K) => V
): <T>(modelA: T, modelB: T) => number {
  return <T, V>(modelA: T, modelB: T) => {
    if (isNil(valueConverter)) {
      return modelA[propertyName] < modelB[propertyName] ? -1 : 1;
    }

    const valueA: V = valueConverter(modelA[propertyName]);
    const valueB: V = valueConverter(modelB[propertyName]);

    return valueA < valueB ? -1 : 1;
  };
}
