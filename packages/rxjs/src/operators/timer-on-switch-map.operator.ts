import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

/**
 * Starts the observable with a timer, then switches to the provided callback observable.
 *
 * @template T - The output type of the callback observable.
 * @param delay - The delay in milliseconds for the timer.
 * @param callback - A function that returns the observable to switch to after the delay.
 * @returns An observable that starts with a delay and then switches to the callback observable.
 *
 * @example
 * of('example').pipe(
 *   switchOnTimer(500, () => of('delayed result'))
 * ).subscribe(value => console.log(value)); // Logs 'delayed result' after 500 ms
 */
export function timerOnSwitchMap<T>(delay: number, callback: () => Observable<T>): Observable<T> {
  return timer(delay).pipe(switchMap(callback));
}
