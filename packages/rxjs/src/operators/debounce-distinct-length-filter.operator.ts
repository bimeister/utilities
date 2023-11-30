import { isEmpty } from '@bimeister/utilities.common';
import type { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

interface DebounceDistinctLengthFilterOptions {
  debounceTime?: number;
  minLength?: number;
}

const DEFAULT_MIN_SEARCH_LENGTH: number = 1;

const DEFAULT_DEBOUNCE_TIME_MS: number = 300;

export const debounceDistinctLengthFilter =
  (options: DebounceDistinctLengthFilterOptions = {}): OperatorFunction<string, string> =>
  (source$: Observable<string>): Observable<string> =>
    source$.pipe(
      debounceTime(options.debounceTime ?? DEFAULT_DEBOUNCE_TIME_MS),
      distinctUntilChanged(),
      filter((searchValue: string) => {
        if (isEmpty(searchValue)) {
          return true;
        }

        const searchValueLength: number = searchValue.length;
        const searchValueMinLength: number = options.minLength ?? DEFAULT_MIN_SEARCH_LENGTH;

        return searchValueLength >= searchValueMinLength;
      })
    );
