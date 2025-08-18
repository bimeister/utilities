import type { Uuid } from '@bimeister/utilities.types';
import { validate } from 'uuid';

export function isUuid(input: unknown): input is Uuid {
  return typeof input === 'string' && (validate(input) || isUuidLike(input));
}

/**
 * Без проверки версии и варианта GUID
 */
function isUuidLike(input: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(input);
}
