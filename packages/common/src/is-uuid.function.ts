import type { Uuid } from '@bimeister/utilities.types';
import { validate } from 'uuid';

export function isUuid(input: string): input is Uuid {
  return validate(input);
}
