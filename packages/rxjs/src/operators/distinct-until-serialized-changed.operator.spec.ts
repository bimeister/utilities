import { distinctUntilSerializedChanged } from '@bimeister/utilities.rxjs';
import { from, Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
}

describe('buffer-from-to.operator.ts', () => {
  it('should leave one element', () => {
    const source$: Observable<User> = from([
      { id: 1, name: 'test' },
      { id: 1, name: 'test' },
      { id: 1, name: 'test' },
    ]);

    const emits: unknown[] = [];

    source$.pipe(distinctUntilSerializedChanged()).subscribe((output: User) => {
      emits.push(output);
    });

    expect(emits).toEqual([{ id: 1, name: 'test' }]);
  });
});
