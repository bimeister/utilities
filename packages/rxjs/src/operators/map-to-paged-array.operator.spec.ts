import { Observable, of } from "rxjs";
import { mapToPagedArray } from "@bimeister/utilities.rxjs";
import { VOID } from "@bimeister/utilities.constants";

describe('map-to-paged-array.operator.spec.ts', () => {
  it('should map to paged array', () => {
    const initialItemsCount: number = 6;
    const itemsPerPage: number = 3;

    const initialItems$: Observable<unknown[]> = of(new Array(initialItemsCount).fill(VOID).map((_, index: number) => index));
    const emits: unknown[] = [];

    initialItems$
      .pipe(mapToPagedArray(itemsPerPage))
      .subscribe((output: unknown): void => {
        emits.push(output);
      })
      .unsubscribe();

    expect(emits).toEqual([[[0, 1, 2], [3, 4, 5]]]);
  });
});
