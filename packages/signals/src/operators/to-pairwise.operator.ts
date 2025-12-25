import { effect, Injector, Signal, signal, WritableSignal } from '@angular/core';

export function toPairwise<T>(source: Signal<T>, injector: Injector): Signal<[T, T] | null> {
  const pair: WritableSignal<[T, T] | null> = signal<[T, T] | null>(null);

  let isFirst: boolean = true;
  let prev: T;

  effect(
    () => {
      const curr: T = source();

      if (isFirst) {
        prev = curr;
        isFirst = false;
        return;
      }

      pair.set([prev, curr]);
      prev = curr;
    },
    { injector }
  );

  return pair.asReadonly();
}
