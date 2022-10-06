import { from, Observable } from "rxjs";
import { distinctUntilSerializedChanged } from "@bimeister/utilities.rxjs";

describe('buffer-from-to.operator.ts', () => {
  it('should leave one element', () => {
    const source$: Observable<unknown> = from([1, 1, 1]);

    const emits: unknown[] = [];

    source$
      .pipe(distinctUntilSerializedChanged())
      .subscribe((output) => {
      emits.push(output);
    });

    expect(emits).toEqual([1]);
  });
});
