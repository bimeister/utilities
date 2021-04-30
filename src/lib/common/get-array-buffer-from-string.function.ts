import { parse } from 'uuid';

export function getArrayBufferFromString(inputString: string): Uint8Array | null {
  if (typeof inputString !== 'string') {
    return null;
  }
  return new Uint8Array(parse(inputString));
}
