import type { Uuid } from '@workspaces/types';
import { validate } from 'uuid';

export function isUuid(input: string): input is Uuid {
  return validate(input);
}
