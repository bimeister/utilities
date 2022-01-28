interface Options {
  dropLeftPattern?: RegExp;
  dropRightPattern?: RegExp;
}

export function getSubstringBetween(
  source: string,
  { dropLeftPattern: leftRegExp, dropRightPattern: rightRegExp }: Options
): string {
  const leftMatchArray: RegExpMatchArray | null = leftRegExp instanceof RegExp ? source.match(leftRegExp) : null;
  const rightMatchArray: RegExpMatchArray | null = rightRegExp instanceof RegExp ? source.match(rightRegExp) : null;

  if (leftMatchArray === null && rightMatchArray === null) {
    return source;
  }

  const leftSubstringIndex: number = getLeftMatchEndIndex(source, leftMatchArray);
  const rightSubstringIndex: number = getRightMatchStartIndex(source, rightMatchArray);

  return source.substring(leftSubstringIndex, rightSubstringIndex);
}

function getLeftMatchEndIndex(source: string, leftMatchArray: RegExpMatchArray | null): number {
  if (leftMatchArray === null) {
    return 0;
  }

  const leftMatch: string = leftMatchArray[0];
  return source.indexOf(leftMatch) + leftMatch.length;
}

function getRightMatchStartIndex(source: string, rightMatchArray: RegExpMatchArray | null): number {
  if (rightMatchArray === null) {
    return source.length;
  }

  const rightMatch: string = rightMatchArray[0];
  return source.indexOf(rightMatch);
}
