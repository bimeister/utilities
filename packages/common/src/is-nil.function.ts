/**
 * @packageDocumentation
 * @module Common
 */
export function isNil<T>(entity: T): entity is null | undefined {
  return entity === undefined || entity === null;
}
