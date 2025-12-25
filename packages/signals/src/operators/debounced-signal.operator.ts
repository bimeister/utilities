import { effect, Injector, Signal, signal, WritableSignal } from '@angular/core';

export function debouncedSignal<T>(source: Signal<T>, delay: number, injector?: Injector): Signal<T> {
  const out: WritableSignal<T> = signal(source());

  effect(
    (onCleanup: (cleanupFn: () => void) => void): void => {
      const value: T = source();

      const timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => out.set(value), delay);

      onCleanup(() => clearTimeout(timeoutId));
    },
    injector ? { injector } : undefined
  );

  return out.asReadonly();
}
