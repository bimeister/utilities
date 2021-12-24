import type { Nullable } from 'packages/types';

export function isNil<T>(entity: Nullable<T>): entity is null | undefined {
  return entity === undefined || entity === null;
}
