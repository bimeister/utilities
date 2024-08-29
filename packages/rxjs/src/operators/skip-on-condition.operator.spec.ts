import { Observable, of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { skipOnCondition } from './skip-on-condition.operator';

describe('skip-on-condition.operator.ts', () => {
  it('should filter values correctly when predicate returns true', (done: jest.DoneCallback) => {
    const source$: Observable<string> = of('a', 'b', 'c');
    const other$: Observable<boolean> = of(true);

    const expectedValues: string[] = ['a', 'b', 'c'];

    source$
      .pipe(
        skipOnCondition(other$, (value: boolean) => value),
        toArray()
      )
      .subscribe({
        next: (result: string[]) => expect(result).toEqual(expectedValues),
        complete: () => done()
      });
  });

  it('should emit nothing if predicate returns false for all values', (done: jest.DoneCallback) => {
    const source$: Observable<string> = of('a', 'b', 'c');
    const other$: Observable<boolean> = of(false);

    const expectedValues: string[] = [];

    source$
      .pipe(
        skipOnCondition(other$, (value: boolean) => value),
        toArray()
      )
      .subscribe({
        next: (result: string[]) => expect(result).toEqual(expectedValues),
        complete: () => done()
      });
  });
});
