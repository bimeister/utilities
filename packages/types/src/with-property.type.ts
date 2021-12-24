export type WithProperty<T extends object, K extends string> = T & Record<K, T[keyof T]>;
