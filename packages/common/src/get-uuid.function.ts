import type { Uuid } from 'packages/types';
import { v4 } from 'uuid';

export function getUuid(): Uuid;
export function getUuid(): string {
  return v4();
}
