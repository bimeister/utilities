import { Observable, Subscriber } from 'rxjs';

export function resizeObservable(
  element: HTMLElement,
  options?: ResizeObserverOptions
): Observable<ResizeObserverEntry[]> {
  return new Observable<ResizeObserverEntry[]>((subscriber: Subscriber<ResizeObserverEntry[]>) => {
    const resizeObserver: ResizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) =>
      subscriber.next(entries)
    );
    resizeObserver.observe(element, options);
    return () => resizeObserver.unobserve(element);
  });
}
