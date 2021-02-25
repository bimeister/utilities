import { isNil } from './is-nil.function';

export function getStringHash(inputString: string): number | undefined {
  if (isNil(inputString) || typeof inputString !== 'string') {
    return undefined;
  }

  const charCodes: number[] = Array.from(inputString).map((char: string) => char.charCodeAt(0));

  const hash: number = charCodes.reduce((hashAccumulator: number, currentChar: number) => {
    /** get 32-bit integer: (hash << 5) - hash === hash * 31 */
    // tslint:disable: no-bitwise
    const currentHash: number = currentChar + ((hashAccumulator << 5) - hashAccumulator);
    return currentHash & currentHash;
    // tslint:enable: no-bitwise
  }, 0);

  return hash;
}
