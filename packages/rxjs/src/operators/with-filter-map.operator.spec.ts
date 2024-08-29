import { Observable, of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { withFilterMap } from './with-filter-map.operator';

describe('with-filter-map.operator.ts', () => {
  it('should filter values correctly when predicate returns true', (done: jest.DoneCallback) => {
    const source$: Observable<string> = of('a', 'b', 'c');
    const other$: Observable<boolean> = of(true);

    const expectedValues: string[] = ['a', 'b', 'c'];

    source$
      .pipe(
        withFilterMap(other$, (value: boolean) => value),
        toArray()
      )
      .subscribe({
        next: (result: string[]) => expect(result).toEqual(expectedValues),
        complete: () => done(),
      });
  });

  it('should emit nothing if predicate returns false for all values', (done: jest.DoneCallback) => {
    const source$: Observable<string> = of('a', 'b', 'c');
    const other$: Observable<boolean> = of(false);

    const expectedValues: string[] = [];

    source$
      .pipe(
        withFilterMap(other$, (value: boolean) => value),
        toArray()
      )
      .subscribe({
        next: (result: string[]) => expect(result).toEqual(expectedValues),
        complete: () => done(),
      });
  });
});
