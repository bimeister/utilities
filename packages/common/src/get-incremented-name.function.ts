import { isNil } from './is-nil.function';

const INCREMENTED_NAME_PATTERN: RegExp = new RegExp(/.*[ ][(](\d){1,}[)]$/);
const INCREMENT_PATTERN: RegExp = new RegExp(/[(](\d){1,}[)]$/);

const getCurrentIncrement: (stringToCheck: string) => number = (stringToCheck: string): number => {
  const stringMatchesNamePattern: boolean = INCREMENTED_NAME_PATTERN.test(stringToCheck);
  if (!stringMatchesNamePattern) {
    return 0;
  }

  const regExpResult: RegExpExecArray | null = INCREMENT_PATTERN.exec(stringToCheck);
  if (regExpResult === null) {
    return 0;
  }

  const bracedIncrement: string = regExpResult[0];
  enum BracketIndex {
    left = 1,
    right = bracedIncrement.length - 1,
  }
  const increment: number = Number(bracedIncrement.substring(BracketIndex.left, BracketIndex.right));
  return !isNil(increment) && !isNaN(increment) ? increment : 0;
};

const getNameWithoutIncrement: (name: string) => string = (name: string): string => {
  if (!INCREMENTED_NAME_PATTERN.test(name)) {
    return name;
  }

  const foundedIncrementIndex: number = name.search(INCREMENT_PATTERN);

  if (!Boolean(foundedIncrementIndex)) {
    return name;
  }

  return name.slice(0, foundedIncrementIndex - 1);
};

export function getIncrementedName(currentName: string, namesArray: string[] = []): string {
  if (!Array.isArray(namesArray) || namesArray.length === 0) {
    return currentName;
  }
  const matchingNames: string[] = namesArray.filter((innerName: string) =>
    [getNameWithoutIncrement(innerName), innerName].includes(currentName)
  );
  if (matchingNames.length === 0) {
    return currentName;
  }
  const highestExistingIncrement: number = matchingNames.reduce(
    (previousInnerIncrement: number, currentInnerName: string) => {
      const currentInnerIncrement: number = getCurrentIncrement(currentInnerName);
      return currentInnerIncrement > previousInnerIncrement ? currentInnerIncrement : previousInnerIncrement;
    },
    0
  );
  return `${currentName} (${highestExistingIncrement + 1})`;
}
