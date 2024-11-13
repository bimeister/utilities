import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { timerOnSwitchMap } from './timer-on-switch-map.operator';

describe('timer-on-switch-map.operator.ts', () => {
  jest.useFakeTimers();

  it('should delay the execution of the callback by the specified time', (done: jest.DoneCallback) => {
    const callback: jest.Mock = jest.fn().mockReturnValue(of('delayed result'));

    timerOnSwitchMap(500, callback)
      .pipe(take(1))
      .subscribe((result: unknown) => {
        expect(result).toBe('delayed result');
        expect(callback).toHaveBeenCalled();
        done();
      });

    jest.advanceTimersByTime(500); // Пропустить 500 мс
  });

  it('should execute callback only once after the delay', (done: jest.DoneCallback) => {
    let count: number = 0;
    const callback = (): Observable<number> => of(++count);

    timerOnSwitchMap(300, callback)
      .pipe(take(1))
      .subscribe((result: number) => {
        expect(result).toBe(1);
        done();
      });

    jest.advanceTimersByTime(300); // Пропустить 300 мс
  });

  it('should not call callback before the specified delay', () => {
    const callback: jest.Mock = jest.fn().mockReturnValue(of('result'));

    timerOnSwitchMap(300, callback).subscribe();

    jest.advanceTimersByTime(100); // Пропустить только 100 мс
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(200); // Пропустить оставшиеся 200 мс
    expect(callback).toHaveBeenCalled();
  });
});
