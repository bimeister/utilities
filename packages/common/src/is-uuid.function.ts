import type { Uuid } from '@bimeister/utilities.types';
import { validate } from 'uuid';

export function isUuid(input: unknown): input is Uuid {
  return typeof input === 'string' && validate(input);
}
