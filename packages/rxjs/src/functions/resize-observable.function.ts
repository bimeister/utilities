import type { ResizeObserver, ResizeObserverEntry, ResizeObserverOptions } from 'packages/internal';
import { NEVER, Observable, Subscriber } from 'rxjs';

export function resizeObservable(
  element: HTMLElement,
  options?: ResizeObserverOptions
): Observable<ResizeObserverEntry[]> {
  if (!resizeObserverExists(globalThis)) {
    return NEVER;
  }

  return new Observable<ResizeObserverEntry[]>((subscriber: Subscriber<ResizeObserverEntry[]>) => {
    const resizeObserver: ResizeObserver = new globalThis.ResizeObserver((entries: ResizeObserverEntry[]) =>
      subscriber.next(entries)
    );
    resizeObserver.observe(element, options);
    return () => resizeObserver.unobserve(element);
  });
}
function resizeObserverExists(context: typeof globalThis): context is typeof globalThis & {
  ResizeObserver: ResizeObserver;
} {
  return 'ResizeObserver' in context && typeof context['ResizeObserver'] === 'function';
}
