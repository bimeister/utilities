import type { Nullable } from '@workspaces/types';
import { stringify } from 'uuid';
import { isNil } from './is-nil.function';

export function getStringFromArrayBuffer(buffer: Nullable<Uint8Array>, offset: number = 0): string | null {
  if (isNil(buffer) || !(buffer instanceof Uint8Array)) {
    return null;
  }
  return stringify(buffer, offset);
}
