import { Signal, WritableSignal, effect, signal } from '@angular/core';
import { isNil } from '@bimeister/utilities.common';

export function resizeSignal(
  element: Signal<HTMLElement | undefined>,
  useRaf?: boolean,
  options?: ResizeObserverOptions
): Signal<ResizeObserverEntry[]> {
  const size: WritableSignal<ResizeObserverEntry[]> = signal<ResizeObserverEntry[]>([]);

  effect((onCleanup: (cleanupFn: () => void) => void): void => {
    const htmlElement: HTMLElement | undefined = element();

    if (isNil(htmlElement)) {
      return;
    }

    let rafId: number | null = null;

    const ro: ResizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      if (useRaf === false) {
        size.set(entries);
        return;
      }

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => size.set(entries));
    });

    ro.observe(htmlElement, options);

    onCleanup(() => {
      if (!isNil(rafId)) {
        cancelAnimationFrame(rafId);
      }

      ro.disconnect();
    });
  });

  return size.asReadonly();
}
