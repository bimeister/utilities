import type { Uuid } from '@workspaces/types';
import { v4 } from 'uuid';

export function getUuid(): Uuid;
export function getUuid(): string {
  return v4();
}
