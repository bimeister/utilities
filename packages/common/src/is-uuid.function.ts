import { Uuid } from 'packages/types';
import { validate } from 'uuid';

export function isUuid(input: string): input is Uuid {
  return validate(input);
}
