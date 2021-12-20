type NullUuid = '00000000-0000-0000-0000-000000000000';

export type Uuid =
  | `${string}-${string}-${1 | 2 | 3 | 4 | 5}${string}-${8 | 9 | 'a' | 'b'}${string}-${string}`
  | NullUuid;
