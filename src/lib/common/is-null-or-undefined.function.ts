export const isNullOrUndefined = <T>(entity: T): entity is null | undefined => {
  return entity === undefined || entity === null;
};
