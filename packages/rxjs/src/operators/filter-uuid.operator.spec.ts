import { getUuid } from '@bimeister/utilities.common';
import { NULL_UUID, VOID } from '@bimeister/utilities.constants';
import type { Uuid } from '@bimeister/utilities.types';
import { from } from 'rxjs';
import { filterUuid } from './filter-uuid.operator';
import { mapToAny } from './map-to-any.operator';

describe('filter-uuid.operator.ts', () => {
  let sampleData: unknown[];

  beforeEach(() => {
    sampleData = new Array(1_000)
      .fill(VOID)
      .map(() => Math.floor(Math.random() * 100))
      .map((randomValue: number) => [randomValue > 50, -randomValue, randomValue.toString(), new Array(randomValue)])
      .flat(1);
  });

  it('should bypass only UUIDs', () => {
    const validValues: Uuid[] = new Array(1_000).fill(VOID).map(() => getUuid());
    const input: unknown[] = sampleData.concat(validValues);

    const bypassedValues: unknown[] = [];

    from(input)
      .pipe(mapToAny(), filterUuid())
      .subscribe((bypassedValue: unknown) => bypassedValues.push(bypassedValue))
      .unsubscribe();

    expect(bypassedValues).toEqual(validValues);
    expect(bypassedValues).toHaveLength(validValues.length);
  });

  it('should bypass null UUIDs too', () => {
    const validValues: Uuid[] = new Array(1_000).fill([NULL_UUID, '00000000-0000-0000-0000-000000000000']).flat(1);
    const input: unknown[] = sampleData.concat(validValues);

    const bypassedValues: unknown[] = [];

    from(input)
      .pipe(mapToAny(), filterUuid())
      .subscribe((bypassedValue: unknown) => bypassedValues.push(bypassedValue))
      .unsubscribe();

    expect(bypassedValues).toEqual(validValues);
    expect(bypassedValues).toHaveLength(validValues.length);
  });
});
