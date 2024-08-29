export type WithProperty<T extends object, K extends PropertyKey> = T & Record<K, T[keyof T]>;
