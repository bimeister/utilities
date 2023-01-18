import { Observable, Subscriber } from 'rxjs';

export function intersectionObservable(
  target: Element,
  options?: IntersectionObserverInit
): Observable<IntersectionObserverEntry[]> {
  return new Observable<IntersectionObserverEntry[]>((subscriber: Subscriber<IntersectionObserverEntry[]>) => {
    const intersectionObserver: IntersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => subscriber.next(entries),
      options
    );
    intersectionObserver.observe(target);
    return () => intersectionObserver.unobserve(target);
  });
}
