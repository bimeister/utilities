import { v4 } from 'uuid';

export function getUuid(): string {
  return v4();
}
