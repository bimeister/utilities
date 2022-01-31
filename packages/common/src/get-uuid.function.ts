import type { Uuid } from '@bimeister/utilities.types';
import { v4 } from 'uuid';

export function getUuid(): Uuid;
export function getUuid(): string {
  return v4();
}
