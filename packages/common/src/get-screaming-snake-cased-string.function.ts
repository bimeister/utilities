import type { Nullable } from 'packages/types';
import { snakeCase } from 'snake-case';
import { isNil } from './is-nil.function';

export function getScreamingSnakeCasedString(input: Nullable<string>): Nullable<string> {
  if (isNil(input)) {
    return input;
  }
  const splittedString: string[] = input.split('.');
  return splittedString
    .map((subString: string) => snakeCase(subString))
    .join('.')
    .toUpperCase();
}
