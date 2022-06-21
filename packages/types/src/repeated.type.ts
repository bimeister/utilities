export type Repeated<T, Count extends number, Result extends T[] = []> = Result['length'] extends Count
  ? Result
  : Repeated<T, Count, [...Result, T]>;
